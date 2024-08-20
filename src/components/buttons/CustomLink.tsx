import clsx from 'clsx';
import Link, { type LinkProps } from 'next/link';
import React from 'react';

export type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<'a'> &
  LinkProps;

export default function CustomLink({
  children,
  href,
  openNewTab,
  className,
  ...rest
}: CustomLinkProps) {
  const isNewTab =
    openNewTab !== undefined
      ? openNewTab
      : href && !href.startsWith('/') && !href.startsWith('#');

  if (!isNewTab) {
    return (
      <Link href={href} legacyBehavior>
        <a {...rest} className={className}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      {...rest}
      className={clsx(className, 'cursor-newtab')}
    >
      {children}
    </a>
  );
}
