/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import accommodationsDetailMock from '@/mocks/data/accommodations-detail.json';
import { getAccommodationStyle } from '@/utils/accommodationStyle';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export const alt = '삼춘이랑 방명록';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://samchoon-irang.vercel.app';

export default async function OgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detailMap = accommodationsDetailMock as Record<string, { name: string }>;
  const data = detailMap[id];

  const name = data?.name || '삼춘';
  const style = getAccommodationStyle(Number(id));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: style.bgColor,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 집 이미지 */}
        <img
          src={`${SITE_URL}${style.houseImage}`}
          alt="house"
          width={340}
          height={340}
          style={{ objectFit: 'contain', marginBottom: 24 }}
        />

        {/* 방명록 라벨 */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#666',
            marginBottom: 8,
          }}
        >
          방명록
        </div>

        {/* 숙소 이름 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#2B343B',
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          {name}
        </div>

        {/* 브랜드 */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 28,
            fontWeight: 600,
            color: '#2B343B',
          }}
        >
          삼춘이랑
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
