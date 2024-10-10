'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { doCredentialsSignIn } from '@/actions/auth';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const loginSchema = z.object({
  email: z.string().email({ message: 'e-mail inválido' }),
  password: z.string().min(6, { message: 'mínimo de 6 caracteres' }).max(50),
});

export function LoginForm() {
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = loginForm.formState;

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

      const response = await doCredentialsSignIn(formData);
      if (!!response.error) {
        //        setErrorMessage(response.error.message)
      } else {
        router.push('/admin');
      }
    } catch (error) {
      //
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-6"
            id="login"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemplo@email.com"
                      aria-label="e-mail"
                      autoComplete="true"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      aria-label="senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="login"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </CardFooter>
    </Card>
  );
}
