import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import ProgressBarProvider from '@/components/ProgressBarProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { cn } from '@/lib/utils';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = 'https://rendifrancisko.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  applicationName: 'Rendi Francisko Portfolio',
  title: {
    default: 'Rendi Francisko',
    template: `%s | rendifrancisko.com`,
  },
  description:
    'Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.',
  keywords: [
    'Rendi Francisko',
    'Rendi Dwi Francisko',
    'Software Engineer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Next.js',
    'JavaScript Portfolio',
    'Indonesia Developer',
  ],
  authors: [
    {
      name: 'Rendi Dwi Francisko',
      url: baseUrl,
    },
  ],
  creator: 'Rendi Dwi Francisko',
  publisher: 'Rendi Dwi Francisko',
  category: 'Technology',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Rendi Francisko',
    type: 'website',
    url: baseUrl,
    siteName: 'Rendi Francisko',
    description:
      'Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.',
    images: [
      {
        url: 'https://rendifrancisko.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Rendi Francisko - Software Engineer',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    title: 'Rendi Francisko',
    site: '@RendiFrancisko',
    creator: '@RendiFrancisko',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://rendifrancisko.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Rendi Francisko - Software Engineer',
      },
    ],
    description:
      'Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.',
  },
  other: {
    'og:image:secure_url': 'https://rendifrancisko.com/api/og',
    'og:image:type': 'image/png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'twitter:image:src': 'https://rendifrancisko.com/api/og',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Rendi Francisko',
      url: baseUrl,
      alternateName: 'Rendi Dwi Francisko Portfolio',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Rendi Dwi Francisko',
      url: baseUrl,
      jobTitle: 'Software Engineer',
      description:
        'Software engineer and full stack developer specializing in modern web applications.',
      image: `${baseUrl}/icon.png`,
      sameAs: [
        'https://www.linkedin.com/in/rendi-dwi-francisko/',
        'https://github.com/Rendyfranzz',
        'mailto:rendidwifrans@gmail.com',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Rendi Francisko',
      },
    },
  ];

  return (
    <html lang='en' className='scroll-smooth!' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen flex flex-col transition-colors bg-background text-foreground antialiased',
          inter.className,
        )}
      >
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only absolute left-4 top-4 z-[1000] rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition focus:outline-hidden'
        >
          Skip to main content
        </a>
        <ProgressBarProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ProgressBarProvider>
        <JsonLd id='global-structured-data' data={structuredData} />
      </body>
    </html>
  );
}
