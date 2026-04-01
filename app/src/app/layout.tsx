import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Goormthon 5',
  description: 'Goormthon 5th Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
