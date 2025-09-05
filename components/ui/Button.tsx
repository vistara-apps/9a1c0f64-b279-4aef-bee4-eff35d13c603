'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl',
        secondary: 'bg-surface text-foreground hover:bg-surface/80 border border-border',
        accent: 'bg-accent text-background hover:bg-accent/90 shadow-lg hover:shadow-xl',
        ghost: 'hover:bg-surface/60 text-foreground',
        outline: 'border border-border bg-transparent hover:bg-surface/60 text-foreground',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-6 py-3',
        lg: 'h-12 px-8 py-4',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
