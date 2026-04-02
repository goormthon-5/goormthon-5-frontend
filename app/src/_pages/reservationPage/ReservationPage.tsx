'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, HStack, Text, VStack } from '@vapor-ui/core';
import CategoryTag from '@/components/CategoryTag';
import RatingBadge from '@/components/RatingBadge';
import ActionButton from '@/components/ActionButton';
import BottomNavBar from '@/components/BottomNavBar';
import HouseCard from '@/components/HouseCard';
import Image from 'next/image';
import { reservationApi } from '@/apis/reservationApi';
import { accommodationApi } from '@/apis/accommodationApi';

export default function ReservationPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    reservationApi
      .getAll()
      .then(async (res) => {
        const reservationsWithDetails = await Promise.all(
          res.data.map(async (r: any) => {
            try {
              const accRes = await accommodationApi.getById(r.accommodationId);
              return { ...r, accommodation: accRes.data };
            } catch {
              return { ...r, accommodation: null };
            }
          }),
        );
        setReservations(reservationsWithDetails);
      })
      .catch(() => {});
  }, []);

  return (
    <VStack $css={styles.layout}>
      {/* 제목 */}
      <Text
        render={<h1 />}
        $css={{
          paddingInline: '$250',
          paddingBottom: '$250',
        }}
        style={styles.title}
      >
        나의 예약 내역
      </Text>

      {/* 예약 카드 목록 */}
      <VStack style={styles.cardList} $css={{ paddingInline: '$250' }}>
        {reservations.map((item: any) => (
          <VStack
            key={item.reservationId}
            style={styles.card}
            onClick={() => router.push(`/detail/${item.accommodationId}`)}
          >
            <HouseCard imageUrl="" bgColor="#E0F4FF" size="card" />

            <VStack style={styles.cardContent}>
              <HStack
                $css={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  width: '100%',
                }}
              >
                <Text style={styles.cardLocation}>
                  {item.accommodation?.address?.address_short || ''}
                </Text>
                <RatingBadge
                  rating={item.averageRating || 0}
                  reviewCount={item.guestBookCount || 0}
                />
              </HStack>

              <Text render={<h2 />} style={styles.cardName}>
                {item.accommodation?.name || ''}
              </Text>

              {(item.accommodation?.options || []).length > 0 && (
                <Box style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                  <CategoryTag
                    label={item.accommodation.options[0]?.name || item.accommodation.options[0]}
                    color="#6DBFFF"
                  />
                </Box>
              )}

              <HStack $css={{ gap: '$100', alignItems: 'center' }}>
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="날짜"
                  width={12}
                  height={13}
                />
                <Text style={styles.dateText}>
                  {item.startDate} - {item.endDate}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        ))}

        {/* 예약 추가 버튼 */}
        <ActionButton label="예약 추가" onClick={() => router.push('/')} />
      </VStack>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </VStack>
  );
}

const styles = {
  layout: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-400, 24px)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-400, 36px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-300, -0.3px)',
    color: '#2B343B',
    margin: 0,
    paddingTop: '10px',
  },
  cardList: {
    gap: '10px',
    paddingBottom: '120px',
  },
  card: {
    borderRadius: '8px',
    overflow: 'visible',
  },
  cardContent: {
    gap: '11px',
    padding: '16px 17px',
    width: '100%',
    maxWidth: '350px',
    height: '153px',
    border: '1px solid #E1E1E1',
    boxSizing: 'border-box' as const,
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
  },
  cardLocation: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-050, 12px)',
    fontWeight: 500,
    lineHeight: 'var(--vapor-typography-lineHeight-050, 18px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-000, 0px)',
    color: '#A1A1A1',
    width: '150px',
  },
  cardName: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-200, 18px)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-200, 26px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: 'var(--vapor-color-foreground-normal-200, #262626)',
    margin: 0,
  },
  dateRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  dateText: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-050, 12px)',
    fontWeight: 500,
    lineHeight: 'var(--vapor-typography-lineHeight-050, 18px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-000, 0px)',
    color: '#989898',
  },
} as const;
