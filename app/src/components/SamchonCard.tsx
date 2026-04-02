'use client';

import { HStack, Text, VStack } from '@vapor-ui/core';
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
    <VStack
      onClick={onClick}
      $css={{ cursor: 'pointer', width: '100%', maxWidth: '350px' }}
    >
      <HouseCard imageUrl={imageUrl} bgColor={bgColor} />
      <VStack
        style={{
          padding: '17px',
          height: '113px',
          gap: '5px',
        }}
        $css={{
          border: '1px solid #E1E1E1',
          borderRadius: '0 0 8px 8px',
          overflow: 'hidden',
        }}
      >
        <HStack
          $css={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Text style={styles.location}>{location}</Text>
          <RatingBadge rating={rating} reviewCount={reviewCount} />
        </HStack>
        <Text style={styles.name}>{name}</Text>
        <HStack style={{ gap: '6px' }}>
          {tags.map((tag) => (
            <CategoryTag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
}

const styles = {
  location: {
    fontSize: 'var(--vapor-typography-fontSize-050, 12px)',
    fontWeight: 500,
    lineHeight: 'var(--vapor-typography-lineHeight-050, 18px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-000, 0px)',
    color: '#A1A1A1',
  },
  name: {
    fontSize: 'var(--vapor-typography-fontSize-200, 18px)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-200, 26px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: 'var(--vapor-color-foreground-normal-200, #262626)',
    marginBlock: 0,
    marginInline: 0,
  },
} as const;
