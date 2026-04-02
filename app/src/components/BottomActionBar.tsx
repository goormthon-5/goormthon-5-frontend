'use client';

import { Box, Button, Text, VStack } from '@vapor-ui/core';

interface BottomActionBarProps {
  label: string;
  onClick: () => void;
  buttonWidth?: string;
  buttonHeight?: string;
  labelFontSize?: string;
  labelFontWeight?: number;
}

export default function BottomActionBar({
  label,
  onClick,
  buttonWidth = '350px',
  buttonHeight = '48px',
  labelFontSize = '16px',
  labelFontWeight = 500,
}: BottomActionBarProps) {
  return (
    <VStack
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      $css={{
        alignItems: 'center',
        width: '100%',
        maxWidth: '390px',
        zIndex: 1000,
      }}
    >
      <VStack
        style={{ width: buttonWidth }}
        $css={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          type="button"
          variant="fill"
          colorPalette="contrast"
          size="xl"
          onClick={onClick}
          style={{ width: '100%', height: buttonHeight }}
          $css={{
            paddingBlock: '$000',
            paddingInline: '$000',
            borderRadius: '$300',
            border: 'none',
            backgroundColor: '#2B343B',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <Text
            style={{
              display: 'block',
              fontSize: labelFontSize,
              fontWeight: labelFontWeight,
              marginBlock: 0,
              marginInline: 0,
            }}
            $css={{
              color: '#fff',
              textAlign: 'center',
              lineHeight: '100%',
            }}
          >
            {label}
          </Text>
        </Button>
      </VStack>

      <VStack
        $css={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: '$100',
        }}
      >
        <Box
          style={{
            width: '134px',
            height: '5px',
            borderRadius: '100px',
            backgroundColor: '#fff',
          }}
        />
      </VStack>
    </VStack>
  );
}
