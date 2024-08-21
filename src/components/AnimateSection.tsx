'use client'; // This directive ensures the component is used on the client side

import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

interface AnimateSectionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode;
}

const AnimateSection: React.FC<AnimateSectionProps> = (props) => {
  return <motion.section {...props}>{props.children}</motion.section>;
};

export default AnimateSection;
