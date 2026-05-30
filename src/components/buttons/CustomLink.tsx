import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import type React from "react";

export type CustomLinkProps = {
	href: string;
	children: React.ReactNode;
	openNewTab?: boolean;
	className?: string;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href">;

export default function CustomLink({
	children,
	href,
	openNewTab,
	className,
	...rest
}: CustomLinkProps) {
	const isNewTab =
		openNewTab !== undefined
			? openNewTab
			: href && !href.startsWith("/") && !href.startsWith("#");

	if (!isNewTab) {
		return (
			<Link to={href} {...rest} className={className}>
				{children}
			</Link>
		);
	}

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={href}
			{...rest}
			className={clsx(className, "cursor-newtab")}
		>
			{children}
		</a>
	);
}
