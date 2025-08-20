import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import ProgressBarProvider from '@/components/ProgressBarProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rendifrancisko.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Rendi Francisko',
    template: `%s | rendifrancisko.com`,
  },
  description:
    'Explore the online portfolio and blog of Rendi Dwi Francisko. Highlighting my projects and offering insights into web development practices.',
  openGraph: {
    title: 'Rendi Francisko',
    type: 'website',
    url: 'https://rendifrancisko.com',
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
  return (
    <html lang='en' className='scroll-smooth!' suppressHydrationWarning>
      <body
        className={cn(
          ' transition-colors bg-background text-foreground antialiased',
          inter.className,
        )}
      >
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
      </body>
    </html>
  );
}
