type JsonLdProps = {
	id: string;
	data:
		| Record<string, unknown>
		| Array<Record<string, unknown>>
		| Array<unknown>;
};

export function JsonLd({ id, data }: JsonLdProps) {
	return (
		<script id={id} type="application/ld+json">
			{JSON.stringify(data)}
		</script>
	);
}
