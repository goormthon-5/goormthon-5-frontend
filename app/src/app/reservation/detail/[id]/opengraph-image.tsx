/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import accommodationsDetailMock from '@/mocks/data/accommodations-detail.json';
import { getAccommodationStyle } from '@/utils/accommodationStyle';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export const alt = '삼춘이랑 숙소 상세';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://samchoon-irang.vercel.app';

export default async function OgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detailMap = accommodationsDetailMock as Record<
    string,
    {
      name: string;
      description: string;
      address?: { address_short?: string };
    }
  >;
  const data = detailMap[id];

  const name = data?.name || '삼춘이랑';
  const location = data?.address?.address_short || '제주';
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
        {/* 삼/춘 글자 (좌우 배경) */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 120,
            fontSize: 200,
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          삼
        </div>
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 120,
            fontSize: 200,
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          춘
        </div>

        {/* 집 이미지 */}
        <img
          src={`${SITE_URL}${style.houseImage}`}
          alt="house"
          width={420}
          height={420}
          style={{ objectFit: 'contain', marginBottom: 20 }}
        />

        {/* 위치 */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#666',
            marginBottom: 8,
          }}
        >
          {location}
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
