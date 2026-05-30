import { Link } from "@tanstack/react-router";
import type React from "react";

interface Myprops {
	children: React.ReactNode;
	href: string;
}
const Links: React.FC<Myprops> = ({ children, href, ...rest }) => {
	return (
		<Link to={href} {...rest} className="text-center p hover:text-primary-500">
			{children}
		</Link>
	);
};

export default Links;
