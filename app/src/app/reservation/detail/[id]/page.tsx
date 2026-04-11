import type { Metadata } from 'next';
import DetailPage from '@/_pages/detailPage/DetailPage';
import accommodationsMock from '@/mocks/data/accommodations.json';
import accommodationsDetailMock from '@/mocks/data/accommodations-detail.json';

// 빌드 타임에 모든 숙소 상세 페이지를 정적 생성 (SSG)
export async function generateStaticParams() {
  return accommodationsMock.map((a) => ({
    id: String(a.accommodationId),
  }));
}

// 각 상세 페이지 메타데이터 (링크 공유 시 미리보기)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const detailMap = accommodationsDetailMock as Record<
    string,
    { name: string; description: string; address?: { address_short?: string } }
  >;
  const data = detailMap[id];

  if (!data) {
    return {
      title: '삼춘이랑',
      description: '제주 삼춘과 함께하는 특별한 여행',
    };
  }

  const title = `${data.name} | 삼춘이랑`;
  const description = data.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
      siteName: '삼춘이랑',
      // images는 opengraph-image.tsx가 자동 생성
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  return <DetailPage id={Number.isFinite(numId) ? numId : 1} />;
}
