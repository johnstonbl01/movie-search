import '@radix-ui/themes/styles.css';

import type { Metadata } from 'next';

import { Theme } from '@radix-ui/themes';

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
      <body>
        <Theme appearance="dark">{children}</Theme>
      </body>
    </html>
  );
}
