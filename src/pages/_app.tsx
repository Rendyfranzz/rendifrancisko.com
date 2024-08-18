import '@/styles/globals.css';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme='dark' attribute='class' enableSystem={false}>
      <Component {...pageProps} />
      <ProgressBar
        height='4px'
        color='#00c4fd '
        options={{ showSpinner: true }}
        shallowRouting
      />
    </ThemeProvider>
  );
}
