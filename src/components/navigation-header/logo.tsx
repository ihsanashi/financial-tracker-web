import { Link, LinkProps } from '@tanstack/react-router';
import { DollarSign } from 'lucide-react';

export const Logo = ({ to }: { to: LinkProps['to'] }) => {
  return (
    <Link
      className="mr-4 flex items-center gap-x-1.5 text-zinc-700 dark:text-zinc-300 [&.active]:text-zinc-950 dark:[&.active]:text-white"
      to={to}
    >
      <DollarSign size={16} />
      <p className="font-semibold">Financial Tracker</p>
    </Link>
  );
};
