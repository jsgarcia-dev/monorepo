import Sourcegraph from '../logo';

import { ThemeToggle } from './toggle-theme';

export function NavBar() {
  return (
    <nav className="border-accent @container flex items-center border-b px-4 py-5">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sourcegraph className="size-8" />
          <span className="text-xl font-bold tracking-widest">Turbo-Dev</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Entrar</span>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
