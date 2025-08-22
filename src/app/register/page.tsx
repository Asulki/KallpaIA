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

// Validación Zod
const passwordSchema = z
  .string()
  .min(8, { message: "Mínimo 8 caracteres." })
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: "Usa letras y números.",
  });

const formSchema = z
  .object({
    nickname: z.string().min(2, { message: "El apodo debe tener al menos 2 caracteres." }),
    email: z.string().email({ message: "Correo electrónico inválido." }),
    age: z.enum(["12", "13", "14", "15", "16", "17"], { required_error: "Selecciona tu edad." }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      email: "",
      age: undefined,
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Conectar a tu backend real:
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(values) })
    toast({
      title: "¡Registro exitoso!",
      description: `¡Bienvenida, ${values.nickname}!`,
    });
    router.push("/avatar");
  }

  // Bloqueo de pegado para Email y Nueva contraseña
  const blockPasteHandlers = {
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
  };

  return (
    <div className="flex items-center justify-center min-h-screen gradient-background dashboard-theme px-4">
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
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
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
                            placeholder="Mín. 8 con letras y números"
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
                        Debe incluir letras y números (mínimo 8 caracteres).
                      </p>
                    </FormItem>
                  )}
                />

                {/* Confirmar contraseña */}
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
