'use client';

import { useRouter } from 'next/navigation';
import CategoryTag, { TAG_COLORS } from '@/components/CategoryTag';
import RatingBadge from '@/components/RatingBadge';
import ActionButton from '@/components/ActionButton';
import BottomNavBar from '@/components/BottomNavBar';
import HouseCard from '@/components/HouseCard';
import Image from 'next/image';

// 임시 더미데이터
const DUMMY_RESERVATIONS = [
  {
    imageUrl: '/images/house-2.png',
    location: '성산읍 시흥리',
    name: '손맛 좋은 옥자 할망',
    rating: 4.9,
    reviewCount: 47,
    tag: { label: '해녀 출신', color: TAG_COLORS.blue },
    date: '2026.02.10 -2026.02.12',
  },
];

export default function ReservationPage() {
  const router = useRouter();

  return (
    <div style={styles.layout}>
      {/* 제목 */}
      <h1 style={styles.title}>나의 예약 내역</h1>

      {/* 예약 카드 목록 */}
      <div style={styles.cardList}>
        {DUMMY_RESERVATIONS.map((item, idx) => (
          <div key={idx} style={styles.card}>
            {/* 카드 이미지 */}
            <HouseCard imageUrl={item.imageUrl} bgColor="#E0F4FF" size="card" />
            {/* 카드 정보 */}
            <div style={styles.cardContent}>
              <div style={styles.cardTopRow}>
                <span style={styles.cardLocation}>{item.location}</span>
                <RatingBadge
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                />
              </div>
              <h2 style={styles.cardName}>{item.name}</h2>
              <div style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                <CategoryTag label={item.tag.label} color={item.tag.color} />
              </div>
              <div style={styles.dateRow}>
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="2"
                    width="10"
                    height="9"
                    rx="1.5"
                    stroke="#989898"
                    strokeWidth="1.2"
                  />
                  <path d="M1 5H11" stroke="#989898" strokeWidth="1.2" />
                  <path
                    d="M3.5 0.5V2.5"
                    stroke="#989898"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8.5 0.5V2.5"
                    stroke="#989898"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={styles.dateText}>{item.date}</span>
              </div>
            </div>
          </div>
        ))}

        {/* 예약 추가 버튼 */}
        <ActionButton label="예약 추가" onClick={() => router.push('/')} />
      </div>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column' as const,
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
    padding: '10px 20px 20px',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    padding: '0 20px',
    paddingBottom: '120px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    borderRadius: '8px',
    overflow: 'visible',
  },
  cardImage: {
    position: 'relative' as const,
    width: '350px',
    height: '141px',
    backgroundColor: '#E0F4FF',
    borderRadius: '8px 8px 0 0',
    borderTop: '1px solid #E1E1E1',
    borderLeft: '1px solid #E1E1E1',
    borderRight: '1px solid #E1E1E1',
    overflow: 'hidden',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '11px',
    padding: '16px 17px',
    width: '350px',
    height: '153px',
    border: '1px solid #E1E1E1',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
  },
  cardTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '312px',
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
