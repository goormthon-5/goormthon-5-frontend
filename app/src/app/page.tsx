'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IconButton } from '@vapor-ui/core';
import SamchonCard from '@/components/SamchonCard';
import { TAG_COLORS } from '@/components/CategoryTag';
import DataSearch from '@/components/main/DataSearch';
import BottomNavBar from '@/components/BottomNavBar';
import ImgLogo from '@/assets/images/main-logo.svg';
import IcMenu from '@/assets/icons/menu-icon.svg';
import IcBell from '@/assets/icons/bell-icon.svg';
import IcSearch from '@/assets/icons/search-icon.svg';

export default function Home() {
  const router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const name: string = '조영찬';

  return (
    <div style={S.layout}>
      {/* 1. Header */}
      <header style={S.header}>
        <div style={{ width: 84, height: 24, position: 'relative' }}>
          <Image
            src={ImgLogo}
            alt="메인 로고"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div style={S.headerIcons}>
          <IconButton aria-label="메뉴 열기" size="md" variant="ghost">
            <Image src={IcMenu} alt="메뉴 아이콘" width={28} height={28} />
          </IconButton>
          <IconButton aria-label="알림" size="md" variant="ghost">
            <Image src={IcBell} alt="벨 아이콘" width={28} height={28} />
          </IconButton>
        </div>
      </header>

      {/* 2. Main Body */}
      <main style={S.main}>
        {/* Welcome Section */}
        <section style={S.welcomeSection}>
          <h1 style={S.welcomeText}>
            {`안녕하세요! ${name}님\n같이 삼춘네로 가볼까요?`}
          </h1>
        </section>

        {/* Search Section */}
        <section style={S.searchSection}>
          {/* 첫 번째: 캘린더 */}
          <DataSearch />

          {/* 두 번째: 검색 */}
          <div style={S.inputWrapper}>
            <Image src={IcSearch} alt="검색" width={18} height={18} />
            <input
              type="text"
              placeholder="마을 이름, 어르신 이름으로 검색"
              style={S.inputInner}
            />
          </div>
        </section>

        {/* Category Tabs */}
        <nav style={S.tabContainer}>
          {AREAS.map((area, idx) => (
            <div
              key={area.name}
              onClick={() => setSelectedIdx(idx)}
              style={S.tabItem}
            >
              <span
                style={{
                  ...S.tabText,
                  fontWeight: idx === selectedIdx ? '700' : '500',
                  color: idx === selectedIdx ? '#6DBFFF' : '#9CA3AF',
                }}
              >
                {area.name}
              </span>
              {idx === selectedIdx && <div style={S.activeBar} />}
            </div>
          ))}
        </nav>

        {/* List Section */}
        <section style={S.listSection}>
          <h2 style={S.sectionTitle}>삼춘 목록</h2>

          <SamchonCard
            imageUrl="/images/house-1.png"
            bgColor="#E0F4FF"
            location="성산읍 시흥리"
            name="손맛 좋은 옥자 할망"
            rating={4.9}
            reviewCount={47}
            tags={[{ label: '식사', color: TAG_COLORS.blue }]}
            onClick={() => router.push('/detail')}
          />
          <SamchonCard
            imageUrl="/images/house-2.png"
            bgColor="#FFC061"
            location="남원읍 위미리"
            name="올레 1코스 정원사 인태 삼춘"
            rating={3.9}
            reviewCount={12}
            tags={[{ label: '동백꽃 산책', color: TAG_COLORS.orange }]}
            onClick={() => router.push('/detail')}
          />
          <SamchonCard
            imageUrl="/images/house-3.png"
            bgColor="#D2FAE8"
            location="구좌읍 세화리"
            name="바닷가 뷰 순자 할멈"
            rating={5.0}
            reviewCount={20}
            tags={[{ label: '바닷가 투어', color: TAG_COLORS.green }]}
            onClick={() => router.push('/detail')}
          />
        </section>
      </main>
      <BottomNavBar />
    </div>
  );
}

const AREAS = [
  { name: '전체' },
  { name: '성산·구좌' },
  { name: '서귀포·남원' },
];

/**
 * 스타일 정의 (S)
 */
const S = {
  layout: {
    display: 'flex',
    maxWidth: '390px',
    margin: '0 auto',
    flexDirection: 'column' as const,
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
  },
  headerIcons: {
    display: 'flex',
    gap: '7px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px',
    gap: '26px',
  },
  welcomeSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    marginBottom: '5px',
  },
  welcomeText: {
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '1.4',
    whiteSpace: 'pre-line' as const,
    margin: 0,
    color: '#1F1F1F',
  },
  searchSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '350px',
    height: '48px',
    padding: '0 14px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #E1E1E1',
    boxSizing: 'border-box' as const,
  },
  inputPlaceholder: {
    flex: 1,
    marginLeft: '8px',
    fontSize: '14.4px',
    color: '#989898',
  },
  inputInner: {
    flex: 1,
    height: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '14.4px',
    color: '#333',
    backgroundColor: 'transparent',
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  tabContainer: {
    display: 'flex',
    gap: '24px',
    borderBottom: '1px solid #F3F4F6',
    position: 'relative' as const,
  },
  tabItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 4px',
    position: 'relative' as const,
  },
  tabText: {
    fontSize: '15px',
    transition: 'color 0.2s',
  },
  activeBar: {
    height: '2px',
    backgroundColor: '#6DBFFF',
    width: '100%',
    position: 'absolute' as const,
    bottom: '-1px',
    zIndex: 1,
  },
  listSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '17px',
    paddingBottom: '80px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1F1F1F',
    margin: '0 0 4px 0',
  },
  cardPlaceholder: {
    height: '254px',
    backgroundColor: '#F9FAFB',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #F3F4F6',
    color: '#9CA3AF',
  },
};
