import { type HTMLMotionProps, motion } from "framer-motion";
import type React from "react";

interface AnimateSectionProps extends HTMLMotionProps<"section"> {
	children: React.ReactNode;
}

const AnimateSection: React.FC<AnimateSectionProps> = (props) => {
	return <motion.section {...props}>{props.children}</motion.section>;
};

export default AnimateSection;
