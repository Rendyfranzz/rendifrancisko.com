export interface BlogMetadata {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	date: string;
	tags: string;
}

export interface Blog {
	meta: BlogMetadata;
	mdxHtml: string;
}
