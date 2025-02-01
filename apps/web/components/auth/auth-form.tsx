'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormData } from '@/schemas';

type FieldName = 'email' | 'password' | 'name';

interface Field {
  name: FieldName;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  showForgotPassword?: boolean;
}

interface AuthFormProps {
  fields: Field[];
  onSubmit: (data: FormData) => void;
  schema: z.Schema;
  buttonText: string;
  isPending?: boolean;
}

export const AuthForm = ({ fields, onSubmit, schema, buttonText, isPending }: AuthFormProps) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        {fields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            control={methods.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel>{fieldConfig.label}</FormLabel>
                  {fieldConfig.showForgotPassword && (
                    <Button variant="link" size="sm" className="h-auto px-0 font-normal" asChild>
                      <Link href="/auth/forgot-password">Forgot password?</Link>
                    </Button>
                  )}
                </div>
                <FormControl>
                  <div className="relative">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                      {fieldConfig.icon}
                    </span>
                    <Input
                      type={fieldConfig.type}
                      placeholder={fieldConfig.placeholder}
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Form Message */}
        {/* <FormSuccess message="Email sent!" />
        <FormError message="Invalid email or password" /> */}

        <Button
          type="submit"
          onClick={methods.handleSubmit(onSubmit)}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? 'Loading...' : buttonText}
        </Button>
      </div>
    </FormProvider>
  );
};
