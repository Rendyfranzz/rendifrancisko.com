import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  techStack: string;
}

export interface Project {
  meta: ProjectMetadata;
  mdxSource: MDXRemoteSerializeResult;
}
