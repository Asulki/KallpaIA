"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BotIcon, User, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "./login-ui.css";

import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// --- schema (nickname + password fuertes)
const nicknameSchema = z.string().min(4).max(20).regex(/^[A-Za-z0-9_]+$/);
const passwordSchema = z.string()
  .min(10)
  .regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/).regex(/[^A-Za-z0-9]/)
  .refine((v) => !/\s/.test(v));
const formSchema = z.object({ nickname: nicknameSchema, password: passwordSchema });

function toLowerNick(n: string) { return n.trim().toLowerCase(); }

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const sp = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // aviso si viene de verificación
  useEffect(() => {
    if (sp?.get("verify") === "1") {
      toast({
        title: "Verifica tu correo",
        description: "Revisa tu bandeja y confirma tu cuenta antes de ingresar.",
      });
    }
  }, [sp, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nickname: "", password: "" },
    mode: "onTouched",
  });

  // bloquear pegar/arrastrar en pass (como tenías)
  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  // 1) resolver correo por apodo
  async function resolveEmailByNickname(nickname: string): Promise<string> {
    const id = toLowerNick(nickname);
    const snap = await getDoc(doc(db, "nicknames", id));
    const email = snap.exists() ? (snap.data() as any)?.emailLogin : undefined;
    if (!email) throw new Error("NO_USER"); // mensaje genérico luego
    return email;
  }

  // 2) login
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // a) apodo -> email
      const email = await resolveEmailByNickname(values.nickname);

      // b) auth
      const cred = await signInWithEmailAndPassword(auth, email, values.password);

      // c) refrescar para ver emailVerified actualizado
      await cred.user.reload();

      if (!cred.user.emailVerified) {
        // sesión sigue abierta: opcional cerrar para evitar estado raro
        await auth.signOut();
        toast({
          title: "Verifica tu correo",
          description: "Confirma tu cuenta desde el email y vuelve a intentar.",
          variant: "destructive",
        });
        return;
      }

      // d) OK → a /avatar
      toast({ title: "¡Bienvenida de vuelta!" });
      router.push("/avatar");
    } catch (_err) {
      // Respuesta genérica (evita filtrar si falló apodo o password)
      toast({
        title: "No se pudo iniciar sesión",
        description: "Verifica tus credenciales e inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="login-card">
        <header className="flex justify-center mb-6">
          <div className="logo">
            <span className="badge"><BotIcon style={{ color: "var(--ink)" }} size={20} /></span>
            <span>KallpaIA</span>
          </div>
        </header>

        <h1 className="title">Inicia sesión</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="stack-20">
            {/* Apodo */}
            <div>
              <label htmlFor="nickname" className="label">Apodo</label>
              <div className="input-wrap">
                <span className="input-icon-left"><User size={18} /></span>
                <input
                  id="nickname"
                  className="input"
                  placeholder="Tu apodo"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  inputMode="text"
                  readOnly
                  onFocus={(e) => e.currentTarget.readOnly = false}
                  {...form.register("nickname")}
                />
              </div>
              {form.formState.errors.nickname && <p className="error">{form.formState.errors.nickname.message}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="label">Contraseña</label>
              <div className="input-wrap">
                <span className="input-icon-left"><Lock size={18} /></span>
                <input id="password" className="input" type={showPassword ? "text" : "password"}
                  placeholder="••••••••••" autoComplete="current-password" {...blockPasteHandlers}
                  onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
                  {...form.register("password")} />
                <button type="button" aria-label={showPassword ? "Ocultar" : "Mostrar"}
                  onClick={() => setShowPassword(s => !s)} className="input-icon-right">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.password && <p className="error">{form.formState.errors.password.message}</p>}
            </div>

            {/* Botones */}
            <div className="stack-16">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Ingresando..." : "Entrar"}
              </button>
              <Link className="btn btn-secondary text-center" href="/password">
                Olvidé mi contraseña
              </Link>
            </div>
          </div>
        </form>

        <p className="form-footer">
          ¿No tienes cuenta? <Link href="/register" className="link">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}
