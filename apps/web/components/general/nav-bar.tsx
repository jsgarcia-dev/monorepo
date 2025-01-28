import Link from 'next/link';
import Sourcegraph from '../logo';
import { Button } from '../ui/button';
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
          <Link href="/auth/sign-in">
            <Button variant="outline" className="dark:border-[1px] dark:border-lime-300">
              Login
            </Button>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
