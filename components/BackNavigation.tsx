import { Button } from '@material-ui/core';
import Link from 'next/link';
import { FC } from 'react';

const BackNavigation: FC<{ href: string; label: string; }> = ({ href, label }) => (
  <nav>
    <Link passHref href={href}>
      <Button component="a">{label}</Button>
    </Link>
  </nav>
);

export default BackNavigation;
