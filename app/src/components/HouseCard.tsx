'use client';

import Image from 'next/image';

type HouseCardSize = 'card' | 'detail';

interface HouseCardProps {
  imageUrl: string;
  bgColor?: string;
  size?: HouseCardSize;
}

const SIZES = {
  card: {
    width: 350,
    height: 141,
    imgW: 226,
    imgH: 163,
    samW: 62,
    samH: 64,
    samLeft: 26,
    samTop: 10,
    chunW: 42,
    chunH: 64,
    chunRight: 30,
    chunTop: 52,
    border: true,
  },
  detail: {
    width: 390,
    height: 325,
    imgW: 326,
    imgH: 235,
    samW: 75,
    samH: 76,
    samLeft: 26,
    samTop: 88,
    chunW: 52,
    chunH: 76,
    chunRight: 30,
    chunTop: 100,
    border: false,
  },
};

export default function HouseCard({
  imageUrl,
  bgColor = '#E0F4FF',
  size = 'card',
}: HouseCardProps) {
  const s = SIZES[size];

  return (
    <div
      style={{
        position: 'relative',
        width: `${s.width}px`,
        height: `${s.height}px`,
        backgroundColor: bgColor,
        borderRadius: s.border ? '8px 8px 0 0' : '0',
        borderTop: s.border ? '1px solid #E1E1E1' : 'none',
        borderLeft: s.border ? '1px solid #E1E1E1' : 'none',
        borderRight: s.border ? '1px solid #E1E1E1' : 'none',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/icons/sam-text.svg"
        alt=""
        width={s.samW}
        height={s.samH}
        style={{
          position: 'absolute',
          left: `${s.samLeft}px`,
          top: `${s.samTop}px`,
          transform: 'rotate(14.39deg)',
        }}
      />
      <Image
        src="/icons/chun-text.svg"
        alt=""
        width={s.chunW}
        height={s.chunH}
        style={{
          position: 'absolute',
          right: `${s.chunRight}px`,
          top: `${s.chunTop}px`,
          transform: 'rotate(-10deg)',
        }}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="집"
          width={s.imgW}
          height={s.imgH}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -45%)',
            objectFit: 'contain',
          }}
        />
      )}
    </div>
  );
}
