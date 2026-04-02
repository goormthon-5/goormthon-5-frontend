'use client';

import RatingBadge from './RatingBadge';
import CategoryTag from './CategoryTag';
import HouseCard from './HouseCard';

interface SamchonCardProps {
  imageUrl: string;
  bgColor?: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
  tags: { label: string; color?: string }[];
  onClick?: () => void;
}

export default function SamchonCard({
  imageUrl,
  bgColor = '#E0F4FF',
  location,
  name,
  rating,
  reviewCount,
  tags,
  onClick,
}: SamchonCardProps) {
  return (
    <div style={styles.card} onClick={onClick}>
      <HouseCard imageUrl={imageUrl} bgColor={bgColor} />
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
    cursor: 'pointer',
    width: '100%',
    maxWidth: '350px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
    padding: '17px',
    height: '113px',
    border: '1px solid #E1E1E1',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  location: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-050, 12px)',
    fontWeight: 500,
    lineHeight: 'var(--vapor-typography-lineHeight-050, 18px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-000, 0px)',
    color: '#A1A1A1',
  },
  name: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-200, 18px)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-200, 26px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: 'var(--vapor-color-foreground-normal-200, #262626)',
    margin: 0,
  },
  tags: {
    display: 'flex',
    gap: '6px',
  },
} as const;
