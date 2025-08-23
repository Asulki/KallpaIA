"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { BotIcon, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "../login/login-ui.css";

import { auth } from "@/lib/firebase";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

const passwordSchema = z
  .string()
  .min(10, { message: "Mínimo 10 caracteres." })
  .regex(/[a-z]/, { message: "Incluye minúscula." })
  .regex(/[A-Z]/, { message: "Incluye mayúscula." })
  .regex(/\d/, { message: "Incluye un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye un símbolo." })
  .refine((v) => !/\s/.test(v), { message: "Sin espacios." });

const formSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden.",
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const { toast } = useToast();

  const [verifying, setVerifying] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const oobCode = sp.get("oobCode");
  const mode = sp.get("mode");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  // Bloquear pegar/arrastrar (opcional)
  const blockPaste = {
    onPaste: (e: React.ClipboardEvent) => e.preventDefault(),
    onDrop: (e: React.DragEvent) => e.preventDefault(),
  };

  useEffect(() => {
    async function verifyCode() {
      try {
        if (!oobCode || mode !== "resetPassword") {
          throw new Error("Código inválido.");
        }
        const mail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(mail);
      } catch (err: any) {
        toast({
          title: "Enlace inválido o expirado",
          description: "Solicita un nuevo enlace de restablecimiento.",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    }
    verifyCode();
  }, [oobCode, mode, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!oobCode) return;
    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, values.password);
      toast({
        title: "Contraseña actualizada",
        description: "Ya puedes iniciar sesión con tu nueva contraseña.",
      });
      router.push("/login");
    } catch (e: any) {
      const code = String(e?.code || "");
      let msg = e?.message || "No se pudo actualizar la contraseña.";
      if (code.includes("auth/expired-action-code")) {
        msg = "El enlace expiró. Solicita uno nuevo.";
      } else if (code.includes("auth/invalid-action-code")) {
        msg = "El enlace no es válido. Solicita uno nuevo.";
      } else if (code.includes("auth/weak-password")) {
        msg = "La contraseña es muy débil.";
      }
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  if (verifying) {
    return (
      <div className="app">
        <div className="login-card">
          <h1 className="title">Verificando enlace…</h1>
          <p className="text-sm text-muted-foreground">Un momento, por favor.</p>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="app">
        <div className="login-card">
          <h1 className="title">Enlace inválido</h1>
          <p className="text-sm text-muted-foreground">
            Solicita un nuevo enlace de restablecimiento o <Link href="/password" className="link">inténtalo otra vez</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="login-card">
        <header className="flex justify-center mb-6">
          <div className="logo">
            <span className="badge">
              <BotIcon style={{ color: "var(--ink)" }} size={20} />
            </span>
            <span>KallpaIA</span>
          </div>
        </header>

        <h1 className="title">Nueva contraseña</h1>
        <p className="text-center text-sm text-muted-foreground -mt-4 mb-6">
          Para <strong>{email}</strong>
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="stack-16">
            {/* Password */}
            <div>
              <label htmlFor="password" className="label">Contraseña</label>
              <div className="input-wrap">
                <span className="input-icon-left"><Lock size={18} /></span>
                <input
                  id="password"
                  className="input"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••••"
                  autoComplete="new-password"
                  {...form.register("password")}
                  {...blockPaste}
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPw(s => !s)}
                  aria-label={showPw ? "Ocultar" : "Mostrar"}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.password
                ? <p className="error">{form.formState.errors.password.message}</p>
                : <p className="help">Mín. 10 caracteres con Aa, 0-9 y símbolo. Sin espacios.</p>}
            </div>

            {/* Confirm */}
            <div>
              <label htmlFor="confirmPassword" className="label">Confirmar contraseña</label>
              <div className="input-wrap">
                <span className="input-icon-left"><Lock size={18} /></span>
                <input
                  id="confirmPassword"
                  className="input"
                  type={showPw2 ? "text" : "password"}
                  placeholder="••••••••••"
                  autoComplete="new-password"
                  {...form.register("confirmPassword")}
                  {...blockPaste}
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPw2(s => !s)}
                  aria-label={showPw2 ? "Ocultar" : "Mostrar"}
                >
                  {showPw2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.confirmPassword &&
                <p className="error">{form.formState.errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Guardando..." : "Actualizar contraseña"}
            </button>

            <Link href="/login" className="btn btn-secondary text-center">
              Volver a iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
