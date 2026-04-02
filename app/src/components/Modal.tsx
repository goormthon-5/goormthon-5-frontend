'use client';

import { ReactNode, useEffect } from 'react';
import { Box, IconButton } from '@vapor-ui/core';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // 전체 화면 어둡게 하는 배경
    <Box
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '80%',
          maxWidth: '350px',
          minHeight: '200px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '21px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* 닫기 아이콘 */}
        <IconButton
          aria-label="닫기"
          size="lg"
          variant="ghost"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            color: '#000',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 300 }}>&times;</span>
        </IconButton>

        {/* 4. 커스텀 컨텐츠가 들어가는 영역 */}
        <Box style={{ paddingTop: '20px' }}>{children}</Box>
      </Box>
    </Box>
  );
}
