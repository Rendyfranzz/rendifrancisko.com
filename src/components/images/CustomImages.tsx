import clsx from "clsx";
import * as React from "react";

type CustomImagesProps = {
	useSkeleton?: boolean;
	imgClassName?: string;
	blurClassName?: string;
	priority?: boolean;
	alt: string;
	width: string | number;
	height: string | number;
} & React.ImgHTMLAttributes<HTMLImageElement>;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function CustomImages({
	useSkeleton = false,
	src,
	width,
	height,
	alt,
	priority = false,
	className,
	imgClassName,
	blurClassName,
	...rest
}: CustomImagesProps) {
	const [status, setStatus] = React.useState(
		useSkeleton ? "loading" : "complete",
	);
	const widthIsSet = className?.includes("w-") ?? false;
	const { loading: loadingProp, ...restProps } = rest;

	return (
		<figure
			style={!widthIsSet ? { width: `${width}px` } : undefined}
			className={className}
		>
			<img
				className={clsx(
					imgClassName,
					// text-gray to hide alt text
					"bg-gray-400 text-gray-400 ",
					status === "loading" && clsx("animate-pulse", blurClassName),
				)}
				src={src}
				width={width}
				height={height}
				alt={alt}
				loading={priority ? "eager" : (loadingProp ?? "lazy")}
				onLoad={() => {
					setStatus("complete");
				}}
				{...restProps}
			/>
		</figure>
	);
}
