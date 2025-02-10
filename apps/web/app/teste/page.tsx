'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Redo2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Sourcegraph from '@/components/logo';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-950 p-6">
      {/* Efeitos de glow ficam no background (z-0) */}
      <div className="absolute bottom-15 left-25 z-0 h-34 w-34 rounded-full bg-[#8F8FFF] blur-3xl" />
      <div className="absolute top-100 right-25 z-0 h-34 w-34 rounded-full bg-[#8F8FFF] blur-3xl" />

      {/* Div principal acima do glow (z-10) */}
      <div className="relative z-10 flex h-[55rem] w-[105rem] flex-col justify-center rounded-4xl bg-black/60 shadow-2xl">
        {/* Barra superior (logo + texto "Create an account") */}
        <div className="flex w-full items-center justify-between px-20 py-6">
          {/* Logo fixada no topo (esquerda) */}
          <div className="flex items-center gap-2">
            <Sourcegraph className="h-10 w-10" />

            <span className="text-2xl font-bold text-white">TURBO-DEV</span>
          </div>
          {/* Texto "Create an account" (direita) */}
          <div className="group flex cursor-pointer items-center gap-1 text-white hover:underline">
            <Redo2 className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-white" />
            <span className="text-lg text-neutral-400 group-hover:text-white">
              Create an account
            </span>
          </div>
        </div>

        {/* Cartão principal centralizado */}
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md space-y-6 border-neutral-800 bg-neutral-900/80 p-8 shadow-2xl backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Log in to Shopper</h2>

            {/* Botão Google */}
            <Button
              variant="outline"
              className="w-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972
                    c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814
                    C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10
                    c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-900 px-2 text-neutral-400">Or continue with</span>
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                type="email"
                placeholder="e.g mail@domain.com"
                className="border-neutral-700 bg-neutral-800/50 pl-10 text-white placeholder:text-neutral-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="border-neutral-700 bg-neutral-800/50 pr-10 pl-10 text-white placeholder:text-neutral-500"
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Eye className="h-4 w-4 text-neutral-500" />
                )}
              </Button>
            </div>

            <Button className="w-full bg-[#8F8FFF]/80 text-white hover:bg-[#8F8FFF]/60">
              Continue with email
            </Button>

            <div className="text-center">
              <a href="#" className="text-sm text-neutral-400 hover:text-white">
                Forgot password?
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
