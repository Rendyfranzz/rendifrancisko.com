'use client';
import clsx from 'clsx';
import * as React from 'react';

type AccentType = React.ComponentPropsWithoutRef<'span'>;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        'transition-colors dark:selection:text-black',
        'bg-gradient-to-tr from-primary-400/40 via-primary-400/40 to-primary-500/40',
        'dark:from-primary-500 dark:to-primary-400 dark:bg-clip-text dark:text-transparent',
      )}
    >
      {children}
    </span>
  );
}
