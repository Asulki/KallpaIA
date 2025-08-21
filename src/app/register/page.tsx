"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BotIcon, User, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nickname: z.string().min(2, {
    message: "El apodo debe tener al menos 2 caracteres.",
  }),
  parentEmail: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida.",
  }),
  password: z.string(),
  profile: z.enum(["student", "teacher"]).optional(),
});

export default function RegisterForm() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      parentEmail: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Primero redirige
    router.push('/avatar');
    // Luego muestra el toast
    toast({
        title: "¡Registro exitoso!",
        description: `¡Bienvenida, ${values.nickname}! Comienza tu aventura.`,
    });
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
                <CardTitle className="font-headline text-2xl">Crea tu Cuenta</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nickname</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input className="pl-10 bg-white/50 border-white/50" placeholder="Tu apodo" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parentEmail"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo Electrónico del Padre</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input className="pl-10 bg-white/50 border-white/50" placeholder="correo.padre@ejemplo.com" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input className="pl-10 bg-white/50 border-white/50" type="password" placeholder="••••••••" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="profile"
                        render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Soy...</FormLabel>
                            <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value="student" />
                                </FormControl>
                                <FormLabel className="font-normal">Estudiante</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value="teacher" />
                                </FormControl>
                                <FormLabel className="font-normal">Docente</FormLabel>
                                </FormItem>
                            </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <Button type="submit" className="w-full font-headline text-lg rounded-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all !mt-6">
                            Crear Cuenta
                        </Button>
                    </form>
                </Form>
              </CardContent>
            </div>
      </Card>
    </div>
  );
}
