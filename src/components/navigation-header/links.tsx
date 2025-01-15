import { Link } from '@tanstack/react-router';

import { commonLinkStyle } from '@lib/utils';

import { Logo } from './logo';

export const Links = () => {
  return (
    <div className="mr-4 hidden md:flex">
      <Logo to="/" />
      <nav className="flex items-center gap-4 text-sm">
        <Link className={commonLinkStyle} to="/accounts">
          Accounts
        </Link>
        <Link className={commonLinkStyle} to="/transactions">
          Transactions
        </Link>
        <Link className={commonLinkStyle} to="/preferences">
          Preferences
        </Link>
      </nav>
    </div>
  );
};
