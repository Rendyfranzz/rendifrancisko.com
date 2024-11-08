'use client';
import * as React from 'react';
import { Tooltip as TippyTooltip, type TooltipProps } from 'react-tippy';

type TooltipTextProps = {
  tipChildren?: React.ReactNode;
  children?: React.ReactNode;
} & TooltipProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

export default function Tooltip({
  tipChildren,
  children,
  ...rest
}: TooltipTextProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <TippyTooltip
      trigger='mouseenter'
      interactive
      html={
        <div className='inline-block rounded-md bg-white p-2 text-gray-600 shadow-md dark:bg-dark dark:text-gray-200'>
          {tipChildren}
        </div>
      }
      {...rest}
    >
      <>{children}</>
    </TippyTooltip>
  );
}
