import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://samchoon-irang.vercel.app',
  ),
  title: {
    default: '삼춘이랑 - 제주 삼춘과 함께하는 여행',
    template: '%s',
  },
  description:
    '제주 삼춘의 집에서 머물며 진짜 제주를 경험해보세요. 밤낚시, 귤 따기, 손맛 집밥 등 로컬만이 줄 수 있는 특별한 여행.',
  keywords: ['제주', '삼춘이랑', '제주여행', '로컬여행', '독거노인', '게스트하우스'],
  openGraph: {
    title: '삼춘이랑',
    description: '제주 삼춘과 함께하는 특별한 여행',
    type: 'website',
    locale: 'ko_KR',
    siteName: '삼춘이랑',
    images: [
      {
        url: '/images/goormthon_main.png',
        width: 1200,
        height: 630,
        alt: '삼춘이랑 - 제주 삼춘과 함께하는 여행',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '삼춘이랑',
    description: '제주 삼춘과 함께하는 특별한 여행',
    images: ['/images/goormthon_main.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        <div className="root">
          <Providers>{children}</Providers>
          <Toast />
        </div>
      </body>
    </html>
  );
}
