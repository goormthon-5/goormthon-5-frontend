'use client';

import Image from 'next/image';

interface RatingBadgeProps {
  rating: number;
  reviewCount: number;
}

export default function RatingBadge({ rating, reviewCount }: RatingBadgeProps) {
  return (
    <div style={styles.wrapper}>
      <Image
        src="/icons/rating-star.svg"
        alt="별점"
        width={10}
        height={10}
      />
      <span style={styles.rating}>{rating}</span>
      <span style={styles.count}>({reviewCount})</span>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  rating: {
    color: '#111',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    lineHeight: '16.5px',
  },
  count: {
    color: '#AAA',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '15px',
  },
} as const;
