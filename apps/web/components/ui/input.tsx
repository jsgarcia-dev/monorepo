import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Estilos base
        'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base md:text-sm',

        // Estilos de borda e input
        'border-input shadow-xs',

        // Estilos de arquivo
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',

        // Estilos de placeholder e seleção
        'placeholder:text-muted-foreground',
        'selection:bg-primary selection:text-primary-foreground',

        // Estilos de ring e outline
        'ring-ring/10 outline-ring/50',
        'dark:ring-ring/20 dark:outline-ring/40',

        // Estados inválidos
        'aria-invalid:border-destructive/60',
        'aria-invalid:outline-destructive/60',
        'aria-invalid:ring-destructive/20',
        'dark:aria-invalid:outline-destructive',
        'dark:aria-invalid:ring-destructive/40',

        // Estados de foco
        'focus-visible:ring-4 focus-visible:outline-1',
        'aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none',
        'dark:aria-invalid:focus-visible:ring-4',

        // Estados desabilitados
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

        // Transições
        'transition-[color,box-shadow]',

        className
      )}
      {...props}
    />
  );
}

export { Input };
