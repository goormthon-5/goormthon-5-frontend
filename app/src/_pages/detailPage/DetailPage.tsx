'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, HStack, Text, TextInput, VStack } from '@vapor-ui/core';
import HouseCard from '@/components/HouseCard';
import CategoryTag, { TAG_COLORS } from '@/components/CategoryTag';
import RatingBadge from '@/components/RatingBadge';
import ActionButton from '@/components/ActionButton';
import BottomActionBar from '@/components/BottomActionBar';
import samchons from '@/mocks/samchons.json';

const DUMMY = samchons[0];

export default function DetailPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<string[]>(DUMMY.messages);
  const [newMessage, setNewMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage('');
      setShowInput(false);
    }
  };

  return (
    <VStack
      $css={{ width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}
    >
      {/* 상단 이미지 영역 */}
      <Box
        $css={{
          position: 'relative',
          width: '100%',
          maxWidth: '390px',
          height: '325px',
          overflow: 'hidden',
          backgroundColor: '#E0F4FF',
        }}
      >
        <Box style={styles.backButtonWrap}>
          <button
            type="button"
            style={styles.backButton}
            onClick={() => router.back()}
          >
            <Image
              src="/icons/arrow.svg"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </button>
        </Box>

        <HouseCard imageUrl={DUMMY.imageUrl} bgColor="#E0F4FF" size="detail" />
      </Box>

      {/* 정보 영역 */}
      <VStack
        style={styles.contentSection}
        $css={{ alignItems: 'flex-start', paddingInline: '$250' }}
      >
        {/* 위치 + 이름 + 별점 */}
        <VStack $css={{ width: '100%', alignItems: 'flex-start', gap: '$050' }}>
          <Text style={styles.location}>{DUMMY.location}</Text>
          <Text style={styles.name}>{DUMMY.name}</Text>
          <RatingBadge rating={DUMMY.rating} reviewCount={DUMMY.reviewCount} />
        </VStack>

        {/* 소개 */}
        <VStack $css={{ width: '100%', alignItems: 'flex-start', gap: '$050' }}>
          <Text style={styles.sectionTitle}>소개</Text>
          <Text style={styles.description}>{DUMMY.description}</Text>
        </VStack>

        <Box style={styles.divider} />

        {/* 함께하는 것들 */}
        <VStack $css={{ width: '100%', alignItems: 'flex-start', gap: '$050' }}>
          <Text style={styles.sectionTitle}>함께하는 것들</Text>

          <HStack
            $css={{ alignItems: 'center', width: '100%' }}
            style={styles.tagRow}
          >
            {DUMMY.tags.map((tag) => (
              <CategoryTag
                key={tag.label}
                label={tag.label}
                color={TAG_COLORS[tag.color as keyof typeof TAG_COLORS]}
              />
            ))}
          </HStack>
        </VStack>

        <Box style={styles.divider} />

        {/* 여행객들의 메세지 */}
        <VStack $css={{ width: '100%', alignItems: 'flex-start', gap: '$050' }}>
          <Text style={styles.sectionTitle}>여행객들의 메세지</Text>

          <VStack
            style={styles.messageList}
            $css={{ width: '100%', marginTop: '$075' }}
          >
            {messages.map((msg, idx) => (
              <HStack
                key={idx}
                style={styles.messageCard}
                $css={{ alignItems: 'center', width: '100%' }}
              >
                <Text style={styles.messageText}>{msg}</Text>
              </HStack>
            ))}

            {showInput && (
              <HStack
                style={styles.messageCard}
                $css={{ alignItems: 'center', width: '100%' }}
              >
                <TextInput
                  style={styles.messageInput}
                  value={newMessage}
                  onValueChange={(value) => setNewMessage(value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                  placeholder="메세지를 입력하세요"
                  autoFocus
                />
              </HStack>
            )}

            <ActionButton
              label="메세지 추가"
              onClick={() =>
                showInput ? handleAddMessage() : setShowInput(true)
              }
            />
          </VStack>
        </VStack>
      </VStack>

      {/* 하단 예약하기 */}
      <BottomActionBar
        label="예약하기"
        onClick={() => router.push('/reservation/complete')}
      />
    </VStack>
  );
}

const styles = {
  layout: {},
  // 상단 이미지
  imageSection: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '390px',
    height: '325px',
    backgroundColor: '#E0F4FF',
    overflow: 'hidden',
  },
  backButtonWrap: {
    position: 'absolute' as const,
    top: '20px',
    left: '0',
    padding: `0 var(--vapor-size-space-200)`,
    zIndex: 10,
    overflow: 'hidden',
  },
  backButton: {
    padding: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  // 컨텐츠
  contentSection: {
    width: '100%',
    alignSelf: 'center',
    boxSizing: 'border-box' as const,
    paddingTop: '22px',
    paddingBottom: '120px',
    gap: '30px',
  },
  infoBlock: {
    width: '100%',
    gap: '4px',
  },
  location: {
    color: '#A1A1A1',
    fontSize: '14.4px',
    fontWeight: 500,
    lineHeight: '21.6px',
  },
  name: {
    fontSize: '21.6px',
    fontWeight: 700,
    lineHeight: '31.2px',
    letterSpacing: '-0.12px',
    color: '#262626',
    margin: 0,
  },
  sectionTitle: {
    fontSize: '14.4px',
    fontWeight: 500,
    lineHeight: '21.6px',
    color: '#262626',
    margin: 0,
  },
  description: {
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
    margin: 0,
    width: '100%',
    wordBreak: 'keep-all' as const,
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#E1E1E1',
  },
  tagRow: {
    marginTop: '9px',
    gap: '10px',
  },
  // 메세지
  messageList: {
    width: '100%',
    gap: '10px',
  },
  messageCard: {
    height: '48px',
    alignSelf: 'stretch',
    padding: '0 17px',
    borderRadius: '8px',
    border: '1px solid #E1E1E1',
    backgroundColor: '#FBFBFB',
    overflow: 'hidden',
  },
  messageInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingBlock: 0,
    paddingInline: 0,
    height: '100%',
    borderRadius: 0,
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
  },
  messageText: {
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
  },
  // 하단 예약하기
  bottomBar: {
    alignItems: 'center',
    position: 'fixed' as const,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '390px',
    cursor: 'pointer',
    padding: 0,
  },
  reserveBar: {
    width: '350px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: '#2B343B',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  reserveText: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#fff',
    textAlign: 'center' as const,
    lineHeight: '100%',
  },
  homeBar: {
    width: '100%',
  },
  homeIndicator: {
    height: '5px',
    backgroundColor: '#fff',
  },
} as const;
