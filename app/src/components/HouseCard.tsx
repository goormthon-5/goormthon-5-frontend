'use client';

import Image from 'next/image';

interface HouseCardProps {
  imageUrl: string;
  bgColor?: string;
  width?: number;
  height?: number;
}

export default function HouseCard({
  imageUrl,
  bgColor = '#E0F4FF',
  width = 350,
  height = 141,
}: HouseCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
        borderRadius: '8px 8px 0 0',
        borderTop: '1px solid #E1E1E1',
        borderLeft: '1px solid #E1E1E1',
        borderRight: '1px solid #E1E1E1',
        overflow: 'hidden',
      }}
    >
      {/* 삼 텍스트 */}
      <Image
        src="/icons/sam-text.svg"
        alt=""
        width={62}
        height={64}
        style={{
          position: 'absolute',
          left: '26px',
          top: '10px',
          transform: 'rotate(14.39deg)',
        }}
      />
      {/* 춘 텍스트 */}
      <Image
        src="/icons/chun-text.svg"
        alt=""
        width={42}
        height={64}
        style={{
          position: 'absolute',
          left: '257px',
          top: '52px',
          transform: 'rotate(-10deg)',
        }}
      />
      {/* 집 이미지 */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="집"
          width={226}
          height={163}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'contain',
          }}
        />
      )}
    </div>
  );
}
