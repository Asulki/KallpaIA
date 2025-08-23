"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BotIcon, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "../login/login-ui.css";

import { auth, db } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const schema = z.object({
  user: z.string().min(1, { message: "Ingresa tu apodo o correo." }),
});

const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s);
const toLowerNick = (n: string) => n.trim().toLowerCase();

async function resolveEmailFromNickname(nickname: string): Promise<string> {
  const snap = await getDoc(doc(db, "nicknames", toLowerNick(nickname)));
  if (!snap.exists()) throw new Error("No existe una cuenta con esos datos.");
  const email = (snap.data() as any)?.emailLogin as string | undefined;
  if (!email) throw new Error("No existe una cuenta con esos datos.");
  return email;
}

export default function PasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  // 👇 NUEVO: URL base para que el enlace no apunte a localhost en producción
  const appBaseUrl =
    process.env.NEXT_PUBLIC_APP_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { user: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setSending(true);
    try {
      const input = values.user.trim();
      // Diagnóstico opcional
      console.log("[RESET] projectId =", (db as any)?.app?.options?.projectId);
      console.log("[RESET] apiKey    =", (db as any)?.app?.options?.apiKey);
      console.log("[RESET] authDomain=", (db as any)?.app?.options?.authDomain);

      const emailToReset = isEmail(input)
        ? input // Si no existe, Auth responde con auth/user-not-found
        : await resolveEmailFromNickname(input);

      // 👇 Único cambio funcional que te pedí: usar appBaseUrl y handleCodeInApp
      await sendPasswordResetEmail(auth, emailToReset, {
        url: `${appBaseUrl}/reset`,
        handleCodeInApp: true,
      });

      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja para restablecer tu contraseña.",
      });
      router.push("/login");
    } catch (e: any) {
      const code = String(e?.code || "");
      let msg = e?.message || "No se pudo enviar el enlace. Intenta de nuevo.";

      if (code.includes("auth/invalid-email"))          msg = "Correo inválido.";
      else if (code.includes("auth/user-not-found"))    msg = "Ese correo no está registrado.";
      else if (code.includes("auth/too-many-requests")) msg = "Demasiados intentos. Intenta más tarde.";
      else if (code.includes("auth/user-disabled"))     msg = "La cuenta está deshabilitada.";
      else if (code.includes("permission-denied"))      msg = "Permiso denegado en Firestore (revisa reglas de nicknames).";

      console.error("[RESET ERROR]", code, e);
      toast({ title: "No se pudo enviar el enlace", description: msg, variant: "destructive" });
    } finally {
      setSending(false);
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

        <h1 className="title">Restablecer contraseña</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="stack-20">
            <div>
              <label htmlFor="user" className="label">Apodo o correo</label>
              <div className="input-wrap">
                <span className="input-icon-left"><Mail size={18} /></span>
                <input
                  id="user"
                  className="input"
                  placeholder="tu_nick o tucorreo@ejemplo.com"
                  {...form.register("user")}
                />
              </div>
              {form.formState.errors.user && <p className="error">{form.formState.errors.user.message}</p>}
            </div>

            <div className="stack-16">
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? "Enviando..." : "Enviar enlace"}
              </button>
              <Link href="/login" className="btn btn-secondary text-center">Volver a iniciar sesión</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
