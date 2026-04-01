'use client';

import Image from 'next/image';
import RatingBadge from './RatingBadge';
import CategoryTag from './CategoryTag';

interface SamchonCardProps {
  imageUrl: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
  tags: { label: string; color?: string }[];
  onClick?: () => void;
}

export default function SamchonCard({
  imageUrl,
  location,
  name,
  rating,
  reviewCount,
  tags,
  onClick,
}: SamchonCardProps) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div style={styles.content}>
        <div style={styles.topRow}>
          <span style={styles.location}>{location}</span>
          <RatingBadge rating={rating} reviewCount={reviewCount} />
        </div>
        <h3 style={styles.name}>{name}</h3>
        <div style={styles.tags}>
          {tags.map((tag) => (
            <CategoryTag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    borderRadius: '8px',
    border: '1px solid #E1E1E1',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  imageWrapper: {
    position: 'relative' as const,
    width: '100%',
    height: '141px',
    backgroundColor: '#DCF4FF',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    padding: '12px 16px 16px',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    color: '#A1A1A1',
    fontFamily: 'var(--vapor-typography-fontFamily-sans)',
    fontSize: 'var(--vapor-typography-fontSize-050)',
    fontWeight: 500,
    lineHeight: 'var(--vapor-typography-lineHeight-050)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-000)',
  },
  name: {
    color: 'var(--vapor-color-foreground-normal-200)',
    fontFamily: 'var(--vapor-typography-fontFamily-sans)',
    fontSize: 'var(--vapor-typography-fontSize-200)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-200)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
    margin: 0,
  },
  tags: {
    display: 'flex',
    gap: '6px',
    marginTop: '4px',
  },
} as const;
