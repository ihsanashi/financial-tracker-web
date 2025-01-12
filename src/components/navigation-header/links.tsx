import { Link } from '@tanstack/react-router';
import { DollarSign } from 'lucide-react';

export const Links = () => {
  return (
    <div className="mr-4 hidden md:flex">
      <Link
        className="mr-4 flex items-center gap-x-1.5 text-zinc-700 dark:text-zinc-300 [&.active]:text-zinc-950 dark:[&.active]:text-white"
        to="/"
      >
        <DollarSign size={16} />
        <p className="font-semibold">Financial Tracker</p>
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        <Link
          className="text-zinc-700 dark:text-zinc-300 [&.active]:text-zinc-950 dark:[&.active]:text-white"
          to="/accounts"
        >
          Accounts
        </Link>
        <Link
          className="text-zinc-700 dark:text-zinc-300 [&.active]:text-zinc-950 dark:[&.active]:text-white"
          to="/transactions"
        >
          Transactions
        </Link>
        <Link
          className="text-zinc-700 dark:text-zinc-300 [&.active]:text-zinc-950 dark:[&.active]:text-white"
          to="/preferences"
        >
          Preferences
        </Link>
      </nav>
    </div>
  );
};
