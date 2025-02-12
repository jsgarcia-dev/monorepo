import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { ThemeProvider } from '@/components/general/theme-provider';
import TopLoader from '@/components/top-loader';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
  preload: false,
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col antialiased`}>
        <ThemeProvider
          themes={['light', 'dark', 'custom']}
          attribute="class"
          defaultTheme="custom"
          enableSystem
          disableTransitionOnChange
        >
          <TopLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
