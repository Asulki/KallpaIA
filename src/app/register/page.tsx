"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
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
import { Separator } from "@/components/ui/separator";

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.19,5.73 17.5,6.7 18.36,8.25L20.25,7.25C18.36,4.75 15.19,3.5 12.19,3.5C6.69,3.5 3,7.5 3,12.5C3,17.5 6.69,21.5 12.19,21.5C17.69,21.5 21.5,17.64 21.5,12.75C21.5,11.89 21.43,11.45 21.35,11.1Z" />
    </svg>
);


const formSchema = z.object({
  nickname: z.string().min(2, {
    message: "El apodo debe tener al menos 2 caracteres.",
  }),
  parentEmail: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  profile: z.enum(["student", "teacher"], {
    required_error: "Debes seleccionar un tipo de perfil.",
  }),
});

export default function RegisterForm() {
    const { toast } = useToast();
    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      parentEmail: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "¡Inicio de sesión exitoso!",
        description: `Bienvenido, ${values.nickname}.`,
    });
    router.push('/dashboard');
  }

  return (
    <div className="flex items-center justify-center min-h-screen gradient-background dashboard-theme">
      <Card className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/40 text-foreground rounded-2xl shadow-lg overflow-hidden">
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apodo</FormLabel>
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
                            <FormLabel>Soy un...</FormLabel>
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
                    <Button type="submit" className="w-full font-headline text-lg rounded-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all">
                        Iniciar Sesión
                    </Button>
                    </form>
                </Form>
                 <div className="relative my-6">
                    <Separator className="w-full bg-white/30" />
                </div>
                <Button variant="outline" className="w-full font-headline text-lg rounded-full py-3 bg-white/80 hover:bg-white text-gray-800 transition-all border-white/50 shadow-md">
                    <GoogleIcon />
                    Iniciar con Google
                </Button>
                <div className="mt-6 text-center text-sm">
                    ¿No tienes una cuenta?{" "}
                    <Link href="#" className="underline text-primary font-bold">
                        Regístrate
                    </Link>
                </div>
              </CardContent>
            </div>
      </Card>
    </div>
  );
}
