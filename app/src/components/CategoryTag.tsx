'use client';

import { Box, HStack, Text } from '@vapor-ui/core';

export const TAG_COLORS = {
  blue: '#4BC2FF',
  orange: '#FFB632',
  green: '#00E284',
} as const;

interface CategoryTagProps {
  label: string;
  color?: string;
}

export default function CategoryTag({
  label,
  color = '#4BC2FF',
}: CategoryTagProps) {
  return (
    <HStack
      style={{
        height: '23px',
        paddingLeft: '3px',
        paddingRight: '9px',
        paddingBlock: 0,
        gap: '3px',
        borderRadius: '15px',
        backgroundColor: color,
      }}
      $css={{
        alignItems: 'center',
      }}
    >
      <Box
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        }}
      />
      <Text
        $css={{
          color: '#fff',
          fontSize: '10.206px',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        {label}
      </Text>
    </HStack>
  );
}
