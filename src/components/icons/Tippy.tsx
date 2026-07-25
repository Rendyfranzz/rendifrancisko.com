'use client';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

type TooltipProps = {
  tipChildren?: React.ReactNode;
  children?: React.ReactNode;
} & TooltipPrimitive.TooltipProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

export default function Tooltip({
  tipChildren,
  children,
  ...rest
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root delayDuration={200} {...rest}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className='inline-block rounded-md p-2 shadow-md bg-background text-foreground z-50'
          sideOffset={4}
        >
          {tipChildren}
          <TooltipPrimitive.Arrow className='fill-background' />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
