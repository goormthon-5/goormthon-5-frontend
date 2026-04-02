'use client';

import { Box, HStack, Text } from '@vapor-ui/core';

interface CategoryTagProps {
  label: string;
  color?: string;
}

export default function CategoryTag({
  label,
  color = '#6DBFFF',
}: CategoryTagProps) {
  return (
    <HStack
      style={{
        height: '23px',
        padding: '0 9px',
        gap: '3px',
        borderRadius: '15px',
        backgroundColor: color,
        flexShrink: 0,
      }}
      $css={{
        alignItems: 'center',
      }}
    >
      <Text
        $css={{
          color: '#fff',
          fontSize: '10.206px',
          fontWeight: 400,
          lineHeight: 'normal',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Text>
    </HStack>
  );
}
