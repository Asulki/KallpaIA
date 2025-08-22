"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { BotIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// ---------- Esquemas ----------
const emailSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido." }),
});

const passwordSchema = z
  .string()
  .min(10, { message: "Mínimo 10 caracteres." })
  .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula." })
  .regex(/\d/,   { message: "Incluye al menos un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye al menos un carácter especial." })
  .refine((v) => !/\s/.test(v), { message: "La contraseña no puede contener espacios." });

const resetSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token"); // Si existe, mostramos el paso 2

  // -------- Bloquear pegar en campos sensibles --------
  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  // ========== PASO 1: Solicitar correo ==========
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  async function onSubmitEmail(values: z.infer<typeof emailSchema>) {
    // TODO: Conectar a tu backend real:
    // await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) })
    toast({
      title: "Revisa tu correo",
      description: "Te enviamos un enlace para restablecer tu contraseña.",
    });
    // Opcional: redirigir a una pantalla de “verifica tu correo”
    // router.push("/check-your-email");
  }

  // ========== PASO 2: Nueva contraseña ==========
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  async function onSubmitReset(values: z.infer<typeof resetSchema>) {
    // TODO: Conectar a tu backend real:
    // await fetch(`/api/auth/reset-password?token=${encodeURIComponent(token || "")}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ password: values.password }),
    // })
    toast({
      title: "Contraseña actualizada",
      description: "Ya puedes iniciar sesión con tu nueva contraseña.",
    });
    router.push("/login");
  }

  // ---------- UI ----------
  return (
    <div className="flex items-center justify-center min-h-screen gradient-background dashboard-theme px-4">
      <Card className="w-full max-w-md bg-white/30 backdrop-blur-lg border-white/40 text-foreground rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Marca */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <BotIcon className="w-10 h-10 text-primary" />
            <span className="font-headline text-3xl font-bold">KallpaIA</span>
          </div>

          {/* Si NO hay token -> Paso 1 (correo). Si hay token -> Paso 2 (nueva contraseña) */}
          {!token ? (
            <>
              <CardHeader className="text-center p-0 mb-6">
                <CardTitle className="font-headline text-2xl">Recuperar contraseña</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Ingresa tu correo y te enviaremos un enlace para restablecerla.
                </p>
              </CardHeader>

              <CardContent className="p-0">
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                className="pl-10 bg-white/50 border-white/50"
                                type="email"
                                placeholder="tucorreo@ejemplo.com"
                                autoComplete="email"
                                inputMode="email"
                                {...blockPasteHandlers}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full font-headline text-lg rounded-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all !mt-2"
                    >
                      Enviar enlace
                    </Button>

                    <p className="text-center text-xs text-muted-foreground mt-2">
                      ¿Ya la recordaste?{" "}
                      <Link href="/login" className="underline underline-offset-2">
                        Inicia sesión
                      </Link>
                    </p>
                  </form>
                </Form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center p-0 mb-6">
                <CardTitle className="font-headline text-2xl">Crea una nueva contraseña</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Elige una contraseña segura para tu cuenta.
                </p>
              </CardHeader>

              <CardContent className="p-0">
                <Form {...resetForm}>
                  <form onSubmit={resetForm.handleSubmit(onSubmitReset)} className="space-y-4">
                    {/* Nueva contraseña */}
                    <FormField
                      control={resetForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva contraseña</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                className="pl-10 pr-12 bg-white/50 border-white/50"
                                type={showPw ? "text" : "password"}
                                placeholder="Mín. 10 con Aa, 0-9 y símbolo"
                                autoComplete="new-password"
                                {...blockPasteHandlers}
                                {...field}
                              />
                              <button
                                type="button"
                                aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
                                onClick={() => setShowPw((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                {showPw ? (
                                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-5 w-5 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground">
                            Debe incluir mayúsculas, minúsculas, números y un carácter especial. Sin espacios.
                          </p>
                        </FormItem>
                      )}
                    />

                    {/* Confirmar contraseña */}
                    <FormField
                      control={resetForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar contraseña</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                className="pl-10 pr-12 bg-white/50 border-white/50"
                                type={showConfirm ? "text" : "password"}
                                placeholder="Vuelve a escribir tu contraseña"
                                autoComplete="new-password"
                                {...blockPasteHandlers}
                                {...field}
                              />
                              <button
                                type="button"
                                aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                                onClick={() => setShowConfirm((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                {showConfirm ? (
                                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-5 w-5 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full font-headline text-lg rounded-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all !mt-2"
                    >
                      Restablecer contraseña
                    </Button>

                    <p className="text-center text-xs text-muted-foreground mt-2">
                      ¿Recordaste tu contraseña?{" "}
                      <Link href="/login" className="underline underline-offset-2">Inicia sesión</Link>
                    </p>
                  </form>
                </Form>
              </CardContent>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
