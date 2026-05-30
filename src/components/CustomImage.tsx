type Props = {
	src: string;
	alt: string;
	priority?: boolean;
};

export default function CustomImage({ src, alt, priority }: Props) {
	const isPriority = Boolean(priority);

	return (
		<div className="w-full h-full">
			<img
				className="rounded-lg mx-auto p-14"
				src={src}
				alt={alt}
				width={650}
				height={650}
				loading={isPriority ? "eager" : "lazy"}
			/>
		</div>
	);
}
