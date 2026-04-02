'use client';

import { ReactNode } from 'react';
import { HStack, Text, VStack, Box } from '@vapor-ui/core';
import CategoryTag from './CategoryTag';
import HouseCard from './HouseCard';

interface SamchonCardProps {
  imageUrl: string;
  bgColor?: string;
  location: string;
  name: string;
  tags: { label: string; color?: string }[];
  onClick?: () => void;
  renderRightTop?: ReactNode;
  children?: ReactNode;
}

export default function SamchonCard({
  imageUrl,
  bgColor = '#E0F4FF',
  location,
  name,
  tags,
  onClick,
  renderRightTop,
  children,
}: SamchonCardProps) {
  return (
    <VStack
      onClick={onClick}
      $css={{
        cursor: 'pointer',
        width: '100%',
        maxWidth: '350px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <HouseCard imageUrl={imageUrl} bgColor={bgColor} />

      <VStack
        style={{
          padding: '17px',
          minHeight: '113px',
          gap: '5px',
        }}
        $css={{
          border: '1px solid #E1E1E1',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <HStack
          $css={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <VStack $css={{ gap: '2px' }}>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.name}>{name}</Text>
          </VStack>

          <Box $css={{ flexShrink: 0 }}>{renderRightTop}</Box>
        </HStack>

        <HStack style={{ gap: '6px', marginTop: '4px' }}>
          {tags.map((tag) => (
            <CategoryTag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </HStack>

        {children && <Box style={{ marginTop: '5px' }}>{children}</Box>}
      </VStack>
    </VStack>
  );
}

const styles = {
  location: {
    fontSize: 'var(--vapor-typography-fontSize-050, 12px)',
    fontWeight: 500,
    lineHeight: 'var(--vapor-typography-lineHeight-050, 18px)',
    color: '#A1A1A1',
  },
  name: {
    fontSize: 'var(--vapor-typography-fontSize-200, 18px)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-200, 26px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#262626',
    margin: 0,
  },
} as const;
