import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'e-mail inválido' }),
  password: z.string().min(6, { message: 'mínimo de 6 caracteres' }).max(50),
});

export function useLoginFormModel() {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = loginForm.formState;

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // TODO: Handle login logic here
    console.log(values);

    return new Promise<void>((resolve) => {
      // Simulate an API call
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  return {
    onSubmit,
    loginForm,
    isSubmitting,
    loginSchema,
  };
}
