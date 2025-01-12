import { ReactNode } from 'react';

export const Root = ({ children }: { children: ReactNode }) => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b backdrop-blur dark:border-b-zinc-800 dark:bg-black/95">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-6">{children}</div>
    </header>
  );
};
