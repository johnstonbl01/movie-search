import '@radix-ui/themes/styles.css';

import type { Metadata } from 'next';

import { Lato } from 'next/font/google';
import { Theme } from '@radix-ui/themes';

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

export const metadata: Metadata = {
  title: 'Movie Search',
  description: 'Search for movies - because you can!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lato.className}>
        <Theme appearance="dark">{children}</Theme>
      </body>
    </html>
  );
}
