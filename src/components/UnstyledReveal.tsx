'use client';
import { cn } from '@/lib/utils';
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useRef } from 'react';

interface UnstyledRevealProps {
  children: React.ReactNode;
  width?: 'w-fit' | 'w-full';
  className?: string;
}

export default function UnstyledReveal({
  children,
  width = 'w-fit',
  className,
}: UnstyledRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInview = useInView(ref, { once: true });
  const mainControl = useAnimation();
  const sideControl = useAnimation();

  React.useEffect(() => {
    if (isInview) {
      mainControl.start('visible');
      sideControl.start('visible');
    }
  }, [isInview]);
  return (
    <div ref={ref} className={cn('relative overflow-hidden', width)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControl}
        transition={{ duration: 0.5, delay: 0.25 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
