# AGENTS.md

This document provides guidelines for AI agents working on rendifrancisko.com.

## Project Overview

Personal portfolio website for Rendi Francisko built with Next.js 14. Features include project showcase, about page, Spotify integration, and pageview analytics using Upstash Redis.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Linting/Formatting**: Biome
- **Animations**: Framer Motion
- **Content**: MDX with next-mdx-remote
- **Database**: Upstash Redis
- **Git Hooks**: Husky + lint-staged

## Code Style

### Linting & Formatting

Always run Biome checks before committing:

```bash
pnpm lint          # Standard lint check
pnpm lint:strict   # Strict lint check
pnpm format:check  # Check formatting
```

Biome automatically fixes issues:

```bash
biome check --write ./src
```

### Code Conventions

- Use TypeScript for all new files (`.tsx` for components, `.ts` for utilities)
- Component files: PascalCase (e.g., `ProjectCard.tsx`)
- Utility files: camelCase (e.g., `utils.tsx`)
- No comments unless explicitly requested
- Use `@/` alias for imports (configured in tsconfig.json)
- Prefer function components with TypeScript interfaces for props

### Tailwind CSS

- Use Tailwind utility classes for styling
- Import `clsx` and `tailwind-merge` for conditional classes:
  ```tsx
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  ```

## Git Workflow

### Pre-commit Hooks

This project uses Husky with lint-staged. Before committing:

1. lint-staged automatically runs Biome on staged files
2. Files are linted, formatted, and checked in sequence
3. Commit only passes if all checks pass

### Commit Messages

Follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code refactoring
- `docs:` for documentation changes
- `style:` for formatting changes
- `chore:` for maintenance tasks

## Common Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linting
pnpm format:check # Check formatting
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── projects/          # Projects listing
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── buttons/           # Button components
│   ├── content/           # Content-related components
│   ├── icons/             # Icon components
│   ├── images/            # Image components
│   ├── layout/            # Layout components
│   ├── seo/               # SEO components
│   └── ui/                # UI primitives
├── contents/project/       # MDX project files
├── lib/                    # Utility functions
│   ├── og-styles.ts       # OG image styles
│   ├── project.tsx        # Project utilities
│   ├── utils.tsx          # Common utilities
│   └── views.tsx          # Pageview utilities
├── styles/                # Global styles
└── types/                 # TypeScript types
```

## MDX Projects

Projects are stored as MDX files in `src/contents/project/`. Each project requires:

1. Frontmatter with metadata (id, title, description, date, tags, etc.)
2. MDX content for the project description
3. Project metadata type defined in `src/types/project.ts`

## Development Patterns

### Server Components

- Use server components by default (async components in `app/`)
- Fetch data directly in component (no useEffect/SWR for server data)

### Client Components

Add `'use client'` directive for:
- Interactive components with state
- Components using Framer Motion
- Event handlers (onClick, onSubmit, etc.)
- Components using React hooks (useState, useEffect, etc.)

### Animations

Use Framer Motion for animations:
- `AnimateSection` for section-level animations
- `Reveal` for reveal animations
- `AnimateDiv` for div-level animations

## API Routes

- `src/app/api/views/` - Pageview tracking endpoints
- API routes use Upstash Redis for storage

## SEO & Metadata

- Use `generateMetadata` in pages for dynamic metadata
- Static metadata in `layout.tsx` and individual pages
- Sitemap in `src/app/sitemap.tsx`
- Robots in `src/app/robots.tsx`
- Manifest in `src/app/manifest.json`

## Testing

No explicit test framework configured. Verify changes by:
1. Running `pnpm lint` and `pnpm format:check`
2. Building with `pnpm build`
3. Testing functionality in development mode

## Dependencies

- Add new dependencies with `pnpm add <package>`
- Add dev dependencies with `pnpm add -D <package>`
- Update dependencies manually in `package.json`

## Performance

- Images use `next/image` via `CustomImage` component
- Fonts optimized with `next/font`
- Progress bar with `next-nprogress-bar`
- Speed insights with `@vercel/speed-insights`
