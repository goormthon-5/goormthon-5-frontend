'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import HouseCard from '@/components/HouseCard';
import CategoryTag, { TAG_COLORS } from '@/components/CategoryTag';
import samchons from '@/mocks/samchons.json';
import IcSearch from '@/assets/icons/search-icon.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

const FILTERS = ['가까운 거리', '인기', '후기 많은', '오늘 가능', '예약 가능'];

export default function MapPage() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedSamchonId, setSelectedSamchonId] = useState<number | null>(
    null,
  );
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const searchResults = selectedSamchonId
    ? samchons.filter((s) => s.id === selectedSamchonId)
    : samchons.filter(
        (s) =>
          s.name.includes(searchQuery) ||
          s.location.includes(searchQuery) ||
          s.area.includes(searchQuery) ||
          s.tags.some((t) => t.label.includes(searchQuery)),
      );

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setSelectedSamchonId(null);
      setShowResults(true);
    }
  };

  const panToSamchon = (id: number) => {
    const s = samchons.find((item) => item.id === id);
    if (s && kakaoMapRef.current) {
      const moveLatLng = new window.kakao.maps.LatLng(
        s.latitude,
        s.longitude,
      );
      kakaoMapRef.current.panTo(moveLatLng);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(33.38, 126.85),
          level: 10,
        });
        kakaoMapRef.current = map;

        samchons.forEach((s) => {
          const position = new window.kakao.maps.LatLng(
            s.latitude,
            s.longitude,
          );

          const wrapper = document.createElement('div');
          wrapper.style.cursor = 'pointer';
          wrapper.innerHTML = `
            <img src="${s.markerIcon}" width="46" height="57" style="display:block;" />
          `;
          wrapper.addEventListener('click', () => {
            setSelectedSamchonId(s.id);
            setShowResults(true);
            map.panTo(position);
          });

          new window.kakao.maps.CustomOverlay({
            position,
            content: wrapper,
            yAnchor: 1,
          }).setMap(map);
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const currentPos = new window.kakao.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude,
            );
            const currentContent = `
              <img src="/icons/current-location.svg" width="64" height="64" style="display:block;" />
            `;

            new window.kakao.maps.CustomOverlay({
              position: currentPos,
              content: currentContent,
              yAnchor: 0.5,
              xAnchor: 0.5,
            }).setMap(map);
          });
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={styles.layout}>
      {/* 카카오 지도 */}
      <div ref={mapRef} style={styles.map} />

      {/* 검색바 */}
      <div style={styles.searchBar}>
        <Image src={IcSearch} alt="검색" width={18} height={18} />
        <input
          type="text"
          placeholder="마을 이름, 어르신 이름으로 검색"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!e.target.value.trim()) {
              setShowResults(false);
              setSelectedSamchonId(null);
            }
          }}
          onKeyDown={handleSearch}
          style={styles.searchInput}
        />
      </div>

      {/* 필터 뱃지 */}
      {!showResults && (
        <div style={styles.filterRow}>
          {FILTERS.map((filter, idx) => (
            <div
              key={filter}
              style={{
                ...styles.filterBadge,
                backgroundColor:
                  idx === selectedFilter ? '#6DBFFF' : '#fff',
                color: idx === selectedFilter ? '#fff' : '#AEAEAE',
              }}
              onClick={() => setSelectedFilter(idx)}
            >
              {filter}
            </div>
          ))}
        </div>
      )}

      {/* 바텀시트 */}
      <div
        style={{
          ...styles.bottomSheet,
          transform: showResults ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {/* 드래그 핸들 */}
        <div
          style={styles.handleBar}
          onClick={() => {
            setShowResults(false);
            setSelectedSamchonId(null);
          }}
        >
          <div style={styles.handle} />
        </div>

        {/* 결과 목록 */}
        <div style={styles.resultList}>
          {searchResults.map((s) => (
            <div
              key={s.id}
              style={styles.resultCard}
              onClick={() => {
                panToSamchon(s.id);
                router.push(`/detail/${s.id}`);
              }}
            >
              {/* 왼쪽 이미지 */}
              <div
                style={{
                  ...styles.resultImage,
                  backgroundColor: s.bgColor,
                }}
              >
                <Image
                  src={s.imageUrl}
                  alt={s.name}
                  width={120}
                  height={86}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {/* 오른쪽 정보 */}
              <div style={styles.resultInfo}>
                <span style={styles.resultLocation}>{s.location}</span>
                <span style={styles.resultName}>{s.name}</span>
                <div style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                  <CategoryTag
                    label={s.tags[0].label}
                    color={
                      TAG_COLORS[
                        s.tags[0].color as keyof typeof TAG_COLORS
                      ]
                    }
                  />
                </div>
              </div>
              {/* 즐겨찾기 */}
              <div
                style={styles.starButton}
                onClick={(e) => toggleFavorite(s.id, e)}
              >
                <img
                  src={
                    favorites.includes(s.id)
                      ? '/icons/active-star.svg'
                      : '/icons/non-active-star.svg'
                  }
                  alt="즐겨찾기"
                  width={11}
                  height={11}
                />
              </div>
            </div>
          ))}
          {searchResults.length === 0 && (
            <div style={styles.noResult}>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </div>
  );
}

const styles = {
  layout: {
    position: 'relative' as const,
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    position: 'absolute' as const,
    top: '20px',
    left: '20px',
    right: '20px',
    maxWidth: '350px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '0 16px',
    backgroundColor: '#fff',
    border: '1px solid #E1E1E1',
    borderRadius: '8px',
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '14.4px',
    fontWeight: 500,
    color: '#333',
  },
  filterRow: {
    position: 'absolute' as const,
    top: '78px',
    left: '20px',
    display: 'flex',
    gap: '8px',
    zIndex: 10,
  },
  filterBadge: {
    height: '24px',
    padding: '0 8px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  // 바텀시트
  bottomSheet: {
    position: 'absolute' as const,
    bottom: '80px',
    left: 0,
    right: 0,
    maxHeight: '480px',
    backgroundColor: '#fff',
    borderRadius: '24px 24px 0 0',
    zIndex: 20,
    transition: 'transform 0.3s ease-in-out',
  },
  handleBar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '24px 24px 0 0',
    cursor: 'pointer',
  },
  handle: {
    width: '44px',
    height: '4px',
    borderRadius: '4px',
    backgroundColor: '#DEDEDE',
  },
  resultList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    padding: '10px 20px 20px',
    overflowY: 'auto' as const,
    maxHeight: '430px',
  },
  resultCard: {
    display: 'flex',
    position: 'relative' as const,
    height: '103px',
    border: '1px solid #E1E1E1',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  resultImage: {
    width: '132px',
    height: '103px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '8px 0 0 8px',
    borderRight: '1px solid #E1E1E1',
  },
  resultInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '7px',
    padding: '16px 12px',
    flex: 1,
    overflow: 'hidden',
  },
  resultLocation: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '9.72px',
    fontWeight: 500,
    lineHeight: '14.58px',
    color: '#A1A1A1',
  },
  resultName: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '14.58px',
    fontWeight: 700,
    lineHeight: '21.06px',
    letterSpacing: '-0.081px',
    color: '#262626',
  },
  starButton: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    width: '18px',
    height: '17px',
    borderRadius: '16px',
    backgroundColor: '#E0F4FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResult: {
    padding: '40px 0',
    textAlign: 'center' as const,
    color: '#989898',
    fontSize: '14px',
  },
} as const;
