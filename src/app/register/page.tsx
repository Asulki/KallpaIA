"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { BotIcon, User, Mail, Lock, Eye, EyeOff, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// ---------- Políticas de seguridad ----------
const nicknameSchema = z
  .string()
  .min(4, { message: "El apodo debe tener al menos 4 caracteres." })
  .max(20, { message: "Máximo 20 caracteres." })
  .regex(/^[A-Za-z0-9_]+$/, {
    message: "Solo letras, números y guion bajo (_), sin espacios.",
  });

const passwordSchema = z
  .string()
  .min(10, { message: "Mínimo 10 caracteres." })
  .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula." })
  .regex(/\d/, { message: "Incluye al menos un número." })
  .regex(/[^A-Za-z0-9]/, { message: "Incluye al menos un carácter especial." })
  .refine((v) => !/\s/.test(v), { message: "La contraseña no puede contener espacios." });

const formSchema = z
  .object({
    nickname: nicknameSchema,
    email: z.string().email({ message: "Correo electrónico inválido." }),
    confirmEmail: z.string().email({ message: "Correo electrónico inválido." }),
    age: z.enum(["12", "13", "14", "15", "16", "17"], {
      required_error: "Selecciona tu edad.",
    }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Los correos no coinciden.",
    path: ["confirmEmail"],
  })
  .superRefine((data, ctx) => {
    const local = data.email.split("@")[0]?.toLowerCase?.() ?? "";
    const pw = data.password.toLowerCase();
    if (pw.includes(data.nickname.toLowerCase())) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "La contraseña no debe contener tu apodo.",
      });
    }
    if (local && pw.includes(local)) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "La contraseña no debe contener tu correo.",
      });
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden.",
      });
    }
  });

// Chequeo de unicidad (simula tu endpoint). Ajusta la URL a tu backend.
async function checkNicknameAvailable(nickname: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/check-nickname?nickname=${encodeURIComponent(nickname)}`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return true; // si falla, no bloqueamos el registro aquí
    const data = await res.json();
    // Espera { available: boolean }
    return !!data.available;
  } catch {
    return true; // ante error de red, no bloquear
  }
}

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [checkingNick, setCheckingNick] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      email: "",
      confirmEmail: "",
      age: undefined,
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  // Bloqueo de pegado para Email/ConfirmEmail y Password/ConfirmPassword
  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  // Verifica unicidad en blur
  async function validateNicknameUnique(nick: string) {
    if (!nick) return;
    setCheckingNick(true);
    const available = await checkNicknameAvailable(nick);
    setCheckingNick(false);
    if (!available) {
      form.setError("nickname", {
        type: "manual",
        message: "Ese apodo ya está en uso. Elige otro.",
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Verificar unicidad ANTES de enviar
    const available = await checkNicknameAvailable(values.nickname);
    if (!available) {
      form.setError("nickname", {
        type: "manual",
        message: "Ese apodo ya está en uso. Elige otro.",
      });
      return;
    }

    // TODO: Conectar a tu backend real de registro:
    // const resp = await fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
    // if (!resp.ok) { manejar errores específicos aquí; return; }

    toast({
      title: "¡Registro exitoso!",
      description: `¡Bienvenida, ${values.nickname}!`,
    });
    router.push("/avatar");
  }

  return (
    <div className="flex items-center justify-center min-h-screen gradient-background px-4">
      <Card className="w-full max-w-md bg-white/30 backdrop-blur-lg border-white/40 text-foreground rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Branding */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <BotIcon className="w-10 h-10 text-primary" />
            <span className="font-headline text-3xl font-bold">KallpaIA</span>
          </div>

          <CardHeader className="text-center p-0 mb-6">
            <CardTitle className="font-headline text-2xl">Crea tu Cuenta</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Completa tus datos para empezar.
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Nickname */}
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nickname</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            className="pl-10 bg-white/50 border-white/50"
                            placeholder="Tu apodo"
                            autoComplete="username"
                            {...field}
                            onBlur={async (e) => {
                              field.onBlur();
                              await validateNicknameUnique(e.target.value.trim());
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {checkingNick && (
                        <p className="text-xs text-muted-foreground">Verificando disponibilidad…</p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Correo electrónico (sin pegar) */}
                <FormField
                  control={form.control}
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

                {/* Confirmar correo (sin pegar) */}
                <FormField
                  control={form.control}
                  name="confirmEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar correo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            className="pl-10 bg-white/50 border-white/50"
                            type="email"
                            placeholder="Repite tu correo"
                            autoComplete="off"
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

                {/* Edad (desplegable 12–17) */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edad</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="pl-10 bg-white/50 border-white/50">
                              <SelectValue placeholder="Selecciona tu edad" />
                            </SelectTrigger>
                            <SelectContent>
                              {["12", "13", "14", "15", "16", "17"].map((y) => (
                                <SelectItem key={y} value={y}>
                                  {y}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contraseña (sin pegar) */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            className="pl-10 pr-12 bg-white/50 border-white/50"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mín. 10 con Aa, 0-9 y símbolo"
                            autoComplete="new-password"
                            {...blockPasteHandlers}
                            {...field}
                          />
                          <button
                            type="button"
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <Eye className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Debe incluir mayúsculas, minúsculas, números y un carácter especial, sin espacios.
                      </p>
                    </FormItem>
                  )}
                />

                {/* Confirmar contraseña (sin pegar) */}
                <FormField
                  control={form.control}
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

                {/* CTA registro */}
                <Button
                  type="submit"
                  className="w-full font-headline text-lg rounded-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all !mt-4"
                >
                  Crear cuenta
                </Button>

                {/* Link a login */}
                <p className="text-center text-xs text-muted-foreground mt-2">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/login" className="underline underline-offset-2">
                    Inicia sesión
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
