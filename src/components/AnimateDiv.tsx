import { type HTMLMotionProps, motion } from "framer-motion";
import type React from "react";

interface AnimateDivProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
}

const AnimateDiv: React.FC<AnimateDivProps> = (props) => {
	return <motion.div {...props}>{props.children}</motion.div>;
};

export default AnimateDiv;
