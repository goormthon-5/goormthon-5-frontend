'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Box, Button, HStack, Text, Textarea, VStack } from '@vapor-ui/core';

import IcStar from '@/assets/icons/active-star.svg';
import IcCamera from '@/assets/icons/camera-icon.svg';

interface GuestbookModalProps {
  onClose: () => void;
  onSubmit: (data: {
    rating: number;
    content: string;
    file: File | null;
  }) => void;
}

export default function GuestbookModal({
  onClose,
  onSubmit,
}: GuestbookModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = rating > 0 && content.trim().length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!isFormValid) return;
    onSubmit({ rating, content, file: selectedFile });
    onClose();
  };

  return (
    <VStack $css={S.modalContainer}>
      <VStack $css={S.titleContainer}>
        <Text $css={S.title}>방명록을 작성해주세요.</Text>

        <VStack $css={S.starSection}>
          <HStack style={{ gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Box
                key={num}
                onClick={() => setRating(num)}
                $css={{
                  cursor: 'pointer',
                  opacity: num <= rating ? 1 : 0.3,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <Image src={IcStar} alt={`${num}점`} width={32} height={32} />
              </Box>
            ))}
          </HStack>
          <Text $css={S.starHint}>별점을 선택해주세요.</Text>
        </VStack>
      </VStack>

      <Textarea
        placeholder="내용을 입력해주세요."
        value={content}
        onValueChange={(value) => setContent(value)}
        style={{
          width: '100%',
          height: '107px',
          marginTop: '21px',
          marginBottom: '15px',
        }}
        $css={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #E1E1E1',
          fontSize: '15px',
          lineHeight: '1.5',
          resize: 'none',
          outline: 'none',
        }}
      />

      <HStack $css={S.bottomSection}>
        <Box
          onClick={() => fileInputRef.current?.click()}
          style={{
            backgroundColor: selectedFile ? '#E0F4FF' : '#F1F1F1',
          }}
          $css={{
            width: '54px',
            height: '41px',
            borderRadius: '$300',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Image src={IcCamera} alt="사진 첨부" width={24} height={24} />
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </Box>

        <Button
          type="button"
          variant="fill"
          colorPalette="contrast"
          size="lg"
          disabled={!isFormValid}
          onClick={handleSave}
          style={{
            flex: 1,
            height: '41px',
          }}
          $css={{
            borderRadius: '$300',
            fontSize: '18px',
            fontWeight: 700,
            backgroundColor: isFormValid ? '#2B343B' : '#C2C2C2',
            color: '#fff',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
        >
          저장하기
        </Button>
      </HStack>
    </VStack>
  );
}

const S = {
  modalContainer: {
    alignItems: 'center',
    width: '100%',
    position: 'relative' as const,
  },
  titleContainer: {
    alignItems: 'center',
    gap: '20px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#555555',
  },
  starSection: {
    alignItems: 'center',
    gap: '8px',
  },
  starHint: {
    fontSize: '14px',
    color: '#C2C2C2',
  },
  bottomSection: {
    width: '100%',
    gap: '12px',
    alignItems: 'center',
  },
};
