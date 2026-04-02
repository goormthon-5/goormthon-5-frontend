'use client';

import Image from 'next/image';
import { HStack, Text } from '@vapor-ui/core';

interface RatingBadgeProps {
  rating: number;
  reviewCount: number;
}

export default function RatingBadge({ rating, reviewCount }: RatingBadgeProps) {
  return (
    <HStack style={{ gap: '2px' }} $css={{ alignItems: 'center' }}>
      <Image src="/icons/rating-star.svg" alt="별점" width={10} height={10} />
      <Text
        $css={{
          color: '#111',
          fontSize: '13.12px',
          fontWeight: 700,
          lineHeight: '16.5px',
        }}
      >
        {rating}
      </Text>
      <Text
        $css={{
          color: '#AAA',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '15px',
        }}
      >
        ({reviewCount})
      </Text>
    </HStack>
  );
}
