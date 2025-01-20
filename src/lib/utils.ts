import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const commonLinkStyle = 'text-zinc-700 dark:text-zinc-300 [&.active]:text-zinc-950 dark:[&.active]:text-white';
