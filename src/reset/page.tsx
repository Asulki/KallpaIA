"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/lib/firebase";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "../login/login-ui.css";

const passwordSchema = z
  .string()
  .min(10, { message: "Mínimo 10 caracteres." })
  .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula." })
  .regex(/\d/,    { message: "Incluye al menos un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye al menos un símbolo." })
  .refine((v) => !/\s/.test(v), { message: "No puede contener espacios." });

const schema = z.object({
  password: passwordSchema,
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: "Las contraseñas no coinciden.",
  path: ["confirm"],
});

export default function ResetPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState<string | null>(null);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const oobCode = sp.get("oobCode");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    (async () => {
      if (!oobCode) {
        toast({ title: "Enlace inválido", description: "Falta el código del enlace.", variant: "destructive" });
        router.push("/password");
        return;
      }
      try {
        const mail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(mail);
      } catch {
        toast({ title: "Enlace inválido o vencido", variant: "destructive" });
        router.push("/password");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oobCode]);

  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  async function onSubmit(values: z.infer<typeof schema>) {
    if (!oobCode) return;
    try {
      await confirmPasswordReset(auth, oobCode, values.password);
      toast({ title: "¡Contraseña actualizada!", description: "Ya puedes iniciar sesión." });
      router.push("/login");
    } catch (e: any) {
      toast({ title: "No se pudo cambiar la contraseña", description: e?.message || "Intenta de nuevo.", variant: "destructive" });
    }
  }

  return (
    <div className="app">
      <div className="login-card">
        <h1 className="title">Cambiar contraseña</h1>
        {email && <p className="mb-4 text-sm text-muted-foreground">Cuenta: <b>{email}</b></p>}

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="stack-16">
            {/* Nueva contraseña */}
            <div>
              <label htmlFor="password" className="label">Nueva contraseña</label>
              <div className="input-wrap">
                <span className="input-icon-left"><Lock size={18}/></span>
                <input
                  id="password"
                  className="input"
                  type={show1 ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...form.register("password")}
                  {...blockPasteHandlers}
                />
                <button type="button" className="input-icon-right" onClick={() => setShow1(s => !s)}>
                  {show1 ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
              {form.formState.errors.password && <p className="error">{form.formState.errors.password.message}</p>}
            </div>

            {/* Confirmación */}
            <div>
              <label htmlFor="confirm" className="label">Confirmar contraseña</label>
              <div className="input-wrap">
                <span className="input-icon-left"><Lock size={18}/></span>
                <input
                  id="confirm"
                  className="input"
                  type={show2 ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...form.register("confirm")}
                  {...blockPasteHandlers}
                />
                <button type="button" className="input-icon-right" onClick={() => setShow2(s => !s)}>
                  {show2 ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
              {form.formState.errors.confirm && <p className="error">{form.formState.errors.confirm.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar nueva contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
