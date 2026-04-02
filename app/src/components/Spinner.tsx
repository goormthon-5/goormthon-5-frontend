'use client';

import { Box } from '@vapor-ui/core';
import { ClipLoader } from 'react-spinners';

interface SpinnerProps {
  size?: number;
  color?: string;
  loading?: boolean;
}

export default function Spinner({
  size = 50,
  color = '#6DBFFF',
  loading = true,
}: SpinnerProps) {
  if (!loading) return null;

  return (
    <Box
      $css={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100000,
        /* 흰 화면에서만 ClipLoader가 있을 때 안 보이는 문제 완화 */
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      }}
    >
      <Box
        $css={{
          width: '100%',
          maxWidth: '390px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ClipLoader
          color={color}
          loading={loading}
          size={size}
          speedMultiplier={1}
        />
      </Box>
    </Box>
  );
}
