'use client';

import { Box, Text } from '@vapor-ui/core';
import { useToastStore } from '@/store/toastStore';

const COLORS = {
  success: { bg: '#2B343B', fg: '#fff' },
  error: { bg: '#E74C3C', fg: '#fff' },
  info: { bg: '#2B343B', fg: '#fff' },
};

export default function Toast() {
  const { message, type, visible } = useToastStore();
  const color = COLORS[type];

  return (
    <Box
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: visible ? '100px' : '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: '200px',
        maxWidth: '320px',
        paddingInline: '18px',
        paddingBlock: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '999px',
        backgroundColor: color.bg,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease, bottom 0.25s ease',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 9999,
      }}
    >
      <Text
        style={{
          color: color.fg,
          fontSize: '14px',
          fontWeight: 500,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          margin: 0,
        }}
      >
        {message}
      </Text>
    </Box>
  );
}
