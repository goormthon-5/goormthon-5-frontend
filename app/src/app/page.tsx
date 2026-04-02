'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IconButton } from '@vapor-ui/core';
import ImgLogo from '@/assets/images/main-logo.svg';
import IcMenu from '@/assets/icons/menu-icon.svg';
import IcBell from '@/assets/icons/bell-icon.svg';

const AREAS = [
  { name: '전체' },
  { name: '성산·구좌' },
  { name: '서귀포·남원' },
];

export default function Home() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const name: string = '조영찬';

  return (
    <div style={S.layout}>
      <header style={S.header}>
        <Image src={ImgLogo} alt="메인 로고" width={83.5} height={23.62} />
        <div style={S.headerIcons}>
          {/* IconButton 사용, 배경색 없는 ghost variant, colorPalette은 primary/secondary 등만 사용 가능, 커서 포인터 추가 */}
          <IconButton
            aria-label="메뉴 열기"
            size="md"
            variant="ghost"
            style={{ cursor: 'pointer' }}
          >
            <Image src={IcMenu} alt="메뉴 아이콘" width={28} height={28} />
          </IconButton>
          <IconButton
            aria-label="알림"
            size="md"
            variant="ghost"
            style={{ cursor: 'pointer' }}
          >
            <Image src={IcBell} alt="벨 아이콘" width={28} height={28} />
          </IconButton>
        </div>
      </header>

      {/* 2. Main Body (VStack) */}
      <main style={S.main}>
        {/* Welcome */}
        <section style={S.welcomeSection}>
          <h1 style={S.welcomeText}>
            {`안녕하세요! ${name}님\n같이 삼춘네로 가볼까요?`}
          </h1>
        </section>

        {/* Search (VStack) */}
        <section style={S.searchSection}>
          <input
            type="text"
            placeholder="언제 도착하시나요?"
            style={S.inputBox}
          />
          <input
            type="text"
            placeholder="마을 이름, 어르신 이름으로 검색"
            style={S.inputBox}
          />
        </section>

        {/* Category Tabs (HStack) */}
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
          <div style={S.cardPlaceholder}>Card 1</div>
          <div style={S.cardPlaceholder}>Card 2</div>
          <div style={S.cardPlaceholder}>Card 3</div>
          <div style={S.cardPlaceholder}>Card 4</div>
        </section>
      </main>
    </div>
  );
}

/**
 * 스타일 모음 (S)
 */
const S = {
  layout: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: 'sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
  },
  logo: {
    fontSize: '18px',
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
  },
  searchSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    width: '350px',
    height: '48px',
    padding: '0 14px',
    fontSize: '14.4px',
    color: '#989898',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #E1E1E1',
    outline: 'none',
    boxSizing: 'border-box' as const,
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
    paddingBottom: '5px',
    position: 'relative' as const,
  },
  tabText: {
    fontSize: '14px',
    fontWeight: '500',
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
    marginBottom: '4px',
  },
  cardPlaceholder: {
    height: '254px',
    backgroundColor: '#F9FAFB',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #F3F4F6',
  },
};
