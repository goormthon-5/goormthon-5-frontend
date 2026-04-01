'use client';

import { useState } from 'react';

const AREAS = [
  { name: '전체' },
  { name: '성산·구좌' },
  { name: '서귀포·남원' },
];

export default function Home() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const name: string = '지영';

  return (
    <div style={S.layout}>
      {/* 1. Header (HStack) */}
      <header style={S.header}>
        <div style={S.logo}>LOGO</div>
        <div style={S.headerIcons}>
          <span>Menu</span>
          <span>Bell</span>
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
          <div style={S.inputBox}>언제 도착하시나요?</div>
          <div style={S.inputBox}>마을 이름, 어르신 이름으로 검색</div>
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
        </section>
      </main>

      {/* 3. Bottom Nav */}
      <footer style={S.bottomNav}>
        <div>홈</div>
        <div style={{ color: '#9CA3AF' }}>지도</div>
        <div style={{ color: '#9CA3AF' }}>예약</div>
        <div style={{ color: '#9CA3AF' }}>마이</div>
      </footer>
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
    padding: '16px 20px',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  headerIcons: {
    display: 'flex',
    gap: '16px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '24px 20px',
    gap: '32px',
  },
  welcomeSection: {
    display: 'flex',
    flexDirection: 'column' as const,
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
    padding: '14px',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    color: '#9CA3AF',
    fontSize: '15px',
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
    paddingBottom: '10px',
    position: 'relative' as const,
  },
  tabText: {
    fontSize: '16px',
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
    gap: '20px',
    paddingBottom: '80px', // Bottom Nav 공간 확보
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
  },
  cardPlaceholder: {
    height: '200px',
    backgroundColor: '#F9FAFB',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #F3F4F6',
  },
  bottomNav: {
    position: 'fixed' as const,
    bottom: 0,
    width: '100%',
    maxWidth: 'inherit', // Container가 있을 경우 대비
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px 0 32px 0',
    borderTop: '1px solid #F3F4F6',
    backgroundColor: '#ffffff',
    fontSize: '12px',
    fontWeight: '500',
  },
};
