import type * as React from "react";
import { cn } from "@/lib/utils";

type TooltipTextProps = {
	tipChildren?: React.ReactNode;
	html?: React.ReactNode;
	children?: React.ReactNode;
	interactive?: boolean;
	trigger?: string;
} & Omit<React.ComponentPropsWithoutRef<"span">, "children">;

export default function Tooltip({
	tipChildren,
	html,
	children,
	interactive = false,
	className,
	...rest
}: TooltipTextProps) {
	const content = tipChildren ?? html;

	if (!content) {
		return <>{children}</>;
	}

	return (
		<span
			className={cn("group/tooltip relative inline-flex", className)}
			{...rest}
		>
			{children}
			<span
				role="tooltip"
				className={cn(
					"absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground opacity-0 shadow-md transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
					interactive ? "pointer-events-auto" : "pointer-events-none",
				)}
			>
				{content}
			</span>
		</span>
	);
}
