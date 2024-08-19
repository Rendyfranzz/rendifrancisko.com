'use client'; // This directive ensures the component is used on the client side

import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

interface AnimateDivProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

const AnimateDiv: React.FC<AnimateDivProps> = (props) => {
  return <motion.div {...props}>{props.children}</motion.div>;
};

export default AnimateDiv;
