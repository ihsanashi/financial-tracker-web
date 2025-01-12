import { ReactNode } from 'react';

import { cn } from '@lib/utils';

export const MainContainer = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('min-h-screen bg-zinc-100 dark:bg-black/95', className)}>{children}</div>;
};
