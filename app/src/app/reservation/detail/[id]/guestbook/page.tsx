import type { Metadata } from 'next';
import GuestbookPage from '@/_pages/guestbookPage/GuestbookPage';
import accommodationsMock from '@/mocks/data/accommodations.json';
import accommodationsDetailMock from '@/mocks/data/accommodations-detail.json';

// 빌드 타임에 모든 방명록 페이지를 정적 생성 (SSG)
export async function generateStaticParams() {
  return accommodationsMock.map((a) => ({
    id: String(a.accommodationId),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const detailMap = accommodationsDetailMock as Record<
    string,
    { name: string }
  >;
  const data = detailMap[id];
  const name = data?.name || '삼춘';

  return {
    title: `${name} 방명록 | 삼춘이랑`,
    description: `${name}에 다녀온 여행객들의 이야기를 확인해보세요.`,
    openGraph: {
      title: `${name} 방명록`,
      description: `${name}에 다녀온 여행객들의 이야기`,
      siteName: '삼춘이랑',
      locale: 'ko_KR',
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
  return (
    <GuestbookPage accommodationId={Number.isFinite(numId) ? numId : 1} />
  );
}
