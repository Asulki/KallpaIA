"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BotIcon, User, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import "./login-ui.css";

// Políticas de ciberseguridad
const nicknameSchema = z
  .string()
  .min(4, { message: "El apodo debe tener al menos 4 caracteres." })
  .max(20, { message: "Máximo 20 caracteres." })
  .regex(/^[A-Za-z0-9_]+$/, {
    message: "Solo letras, números y guion bajo (_), sin espacios.",
  });

const passwordSchema = z
  .string()
  .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula." })
  .regex(/\d/, { message: "Incluye al menos un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye al menos un carácter especial." })
  .refine((v) => !/\s/.test(v), { message: "La contraseña no puede contener espacios." });

const formSchema = z.object({
  nickname: nicknameSchema,
  password: passwordSchema,
});

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nickname: "", password: "" },
    mode: "onTouched",
  });

  // Bloquear pegar y arrastrar en contraseña
  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("/avatar");
    toast({
      title: "¡Inicio de sesión exitoso!",
      description: `¡Bienvenida de vuelta, ${values.nickname}!`,
    });
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

        <h1 className="title">Inicia Sesión</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="stack-20">
            {/* Nickname */}
            <div>
              <label htmlFor="nickname" className="label">Nickname</label>
              <div className="input-wrap">
                <span className="input-icon-left"><User size={18} /></span>
                <input
                  id="nickname"
                  className="input"
                  placeholder="Tu apodo"
                  autoComplete="username"
                  inputMode="text"
                  {...form.register("nickname")}
                />
              </div>
              {form.formState.errors.nickname && (
                <p className="error">{form.formState.errors.nickname.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" aria-label="Contraseña" className="label">
                Contraseña
              </label>
              <div className="input-wrap">
                <span className="input-icon-left"><Lock size={18} /></span>
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  {...blockPasteHandlers}
                  onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
                  {...form.register("password")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="input-icon-right"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="error">{form.formState.errors.password.message}</p>
              )}
              {/* Se eliminó el hint */}
            </div>

            {/* Botones */}
            <div className="stack-16">
              <button type="submit" className="btn btn-primary">Entrar</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => router.push("/password")}
              >
                Olvidé mi contraseña
              </button>
            </div>
          </div>
        </form>

        <p className="form-footer">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="link">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}
