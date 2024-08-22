'use client';
import { cn } from '@/lib/utils';
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'w-fit' | 'w-full';
}

export default function Reveal({ children, width = 'w-fit' }: RevealProps) {
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
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial='hidden'
        animate={sideControl}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 4,
          right: 0,
          background: 'var( --clr-primary-500)',
          zIndex: 20,
        }}
      />
    </div>
  );
}
