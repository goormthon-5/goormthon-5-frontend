'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, HStack, Text, VStack } from '@vapor-ui/core';
import HouseCard from '@/components/HouseCard';
import CategoryTag from '@/components/CategoryTag';
import RatingBadge from '@/components/RatingBadge';
import BottomActionBar from '@/components/BottomActionBar';
import Spinner from '@/components/Spinner';
import { accommodationApi } from '@/apis/accommodationApi';
import { guestBookApi } from '@/apis/guestBookApi';
import { reservationApi } from '@/apis/reservationApi';
import { getAccommodationStyle } from '@/utils/accommodationStyle';

interface DetailPageProps {
  id?: number;
}

export default function DetailPage({ id = 1 }: DetailPageProps) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    setMessages([]);
    accommodationApi
      .getById(id)
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));

    guestBookApi
      .getByAccommodation(id)
      .then((res) =>
        setMessages(res.data.map((g: any) => g.content || g.message || '')),
      )
      .catch(() => {});
  }, [id]);

  if (isLoading) {
    return <Spinner loading />;
  }

  if (!data) return null;

  const previewMessages = messages.slice(0, 2);
  const showGuestbookMore = messages.length > 2;

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

        <HouseCard
          imageUrl={getAccommodationStyle(id).houseImage}
          bgColor={getAccommodationStyle(id).bgColor}
          size="detail"
        />
      </Box>

      {/* 정보 영역 */}
      <VStack
        style={styles.contentSection}
        $css={{
          alignItems: 'flex-start',
          paddingInline: '$250',
          gap: '20px',
        }}
      >
        {/* 위치 + 이름 + 별점 */}
        <VStack $css={{ width: '100%', alignItems: 'flex-start', gap: '$050' }}>
          <Text style={styles.location}>
            {data.address?.address_short || ''}
          </Text>
          <Text style={styles.name}>{data.name}</Text>
          <RatingBadge
            rating={data.averageRating || 0}
            reviewCount={data.guestBookCount || 0}
          />
        </VStack>

        {/* 키워드 */}
        {(data.options || []).length > 0 && (
          <HStack
            $css={{ alignItems: 'center', width: '100%', flexWrap: 'wrap' }}
            style={styles.tagRow}
          >
            {(data.options || []).map((opt: any, idx: number) => (
              <CategoryTag
                key={`${opt.name}-${idx}`}
                label={opt.name}
                color={getAccommodationStyle(id).tagColor}
              />
            ))}
          </HStack>
        )}

        {/* 소개 본문 */}
        <Text typography="body2" style={styles.description}>
          {data.description}
        </Text>

        <Box style={styles.divider} />

        {/* 방명록 */}
        <VStack $css={{ width: '100%', alignItems: 'flex-start', gap: '$300' }}>
          <HStack
            $css={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.guestbookTitle}>방명록</Text>
            {showGuestbookMore && (
              <button
                type="button"
                style={styles.moreButton}
                onClick={() =>
                  router.push(`/reservation/detail/${id}/guestbook`)
                }
              >
                더보기 &gt;
              </button>
            )}
          </HStack>

          <VStack style={styles.messageList} $css={{ width: '100%' }}>
            {previewMessages.map((msg, idx) => (
              <HStack
                key={idx}
                style={styles.messageCard}
                $css={{ alignItems: 'flex-start', width: '100%' }}
              >
                <Text style={styles.messageText}>{msg}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </VStack>

      {/* 하단 예약하기 */}
      <BottomActionBar
        label="예약하기"
        onClick={() => {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          reservationApi
            .create({
              accommodationId: id,
              userId: 51,
              guestCount: 1,
              startDate: today.toISOString().split('T')[0],
              endDate: tomorrow.toISOString().split('T')[0],
            })
            .then(() => router.push('/reservation/complete'))
            .catch(() => router.push('/reservation/complete'));
        }}
      />
    </VStack>
  );
}

const styles = {
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
  contentSection: {
    width: '100%',
    alignSelf: 'center',
    boxSizing: 'border-box' as const,
    paddingTop: '22px',
    paddingBottom: '120px',
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
  description: {
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
    gap: '10px',
  },
  guestbookTitle: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '21.6px',
    color: '#2B343B',
  },
  moreButton: {
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14.4px',
    fontWeight: 500,
    color: '#262626',
  },
  messageList: {
    width: '100%',
    gap: '10px',
  },
  messageCard: {
    minHeight: '48px',
    alignSelf: 'stretch',
    padding: '12px 17px',
    borderRadius: '8px',
    border: '1px solid #E1E1E1',
    backgroundColor: '#FBFBFB',
    overflow: 'hidden',
  },
  messageText: {
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
  },
} as const;
