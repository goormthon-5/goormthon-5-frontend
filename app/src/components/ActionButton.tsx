'use client';

import { Button, Text } from '@vapor-ui/core';

interface ActionButtonProps {
  label: string;
  showPlus?: boolean;
  variant?: 'light' | 'dark';
  onClick?: () => void;
}

export default function ActionButton({
  label,
  showPlus = true,
  variant = 'light',
  onClick,
}: ActionButtonProps) {
  const isDark = variant === 'dark';

  return (
    <Button
      type="button"
      variant={isDark ? 'fill' : 'outline'}
      colorPalette={isDark ? 'contrast' : 'secondary'}
      size="xl"
      onClick={onClick}
      $css={isDark ? styles.buttonDark : styles.buttonLight}
    >
      {showPlus && (
        <Text
          render={<span />}
          $css={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 'normal',
            color: isDark ? '#fff' : 'var(--vapor-color-gray-900, #333)',
          }}
        >
          +
        </Text>
      )}
      <Text
        render={<span />}
        $css={{
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 'normal',
          color: isDark ? '#fff' : 'var(--vapor-color-gray-900, #333)',
        }}
      >
        {label}
      </Text>
    </Button>
  );
}

const styles = {
  buttonLight: {
    width: '100%',
    height: 'var(--dimension-600, 48px)',
    paddingInline: '$150',
    paddingBlock: '$000',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$050',
    borderRadius: '$300',
    border: '1px solid #E1E1E1',
    backgroundColor: 'var(--vapor-color-background-normal, #fff)',
    cursor: 'pointer',
  },
  buttonDark: {
    width: '100%',
    height: 'var(--dimension-600, 48px)',
    paddingInline: '$150',
    paddingBlock: '$000',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$050',
    borderRadius: '$300',
    border: 'none',
    backgroundColor: '#2B343B',
    cursor: 'pointer',
  },
} as const;
