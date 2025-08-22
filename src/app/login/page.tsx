"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BotIcon, User, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nickname: z.string().min(2, {
    message: "El apodo debe tener al menos 2 caracteres.",
  }),
  password: z.string(),
});

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mantén tu lógica existente. Ejemplo:
    router.push("/avatar");
    toast({
      title: "¡Registro exitoso!",
      description: `¡Bienvenida, ${values.nickname}! Comienza tu aventura.`,
    });
  }

  function onPassword() {
    router.push("/password");
  }

  return (
    <div className="flex items-center justify-center min-h-screen gradient-background dashboard-theme">
      <Card className="w-full max-w-md bg-white/30 backdrop-blur-lg border-white/40 text-foreground rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BotIcon className="w-10 h-10 text-primary" />
            <span className="font-headline text-3xl font-bold">KallpaIA</span>
          </div>
          <CardHeader className="text-center p-0 mb-6">
            <CardTitle className="font-headline text-2xl">Inicia Sesión</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Label del formulario para el campo Nickname */}
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

                {/* Label del formulario para el campo Contraseña */}
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
                            placeholder="••••••••"
                            autoComplete="current-password"
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
                    </FormItem>
                  )}
                />

                {/* Botones de acción */}
                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    className="w-full font-headline text-lg rounded-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    Entrar
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full font-headline text-lg rounded-full py-3"
                    onClick={onPassword}
                  >
                    Olvidé mi contraseña
                  </Button>

                  {/* Opcional: si quieres mostrar la opción de crear cuenta sin tocar textos clave */}
                  <p className="text-center text-xs text-muted-foreground">
                    ¿No tienes cuenta?{" "}
                    <Link href="/register" className="underline underline-offset-2">
                      Crear cuenta
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

