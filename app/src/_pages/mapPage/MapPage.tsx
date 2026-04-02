'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import HouseCard from '@/components/HouseCard';
import CategoryTag from '@/components/CategoryTag';
import { accommodationApi } from '@/apis/accommodationApi';
import { getAccommodationStyle } from '@/utils/accommodationStyle';
import IcSearch from '@/assets/icons/search-icon.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

const FILTERS = ['가까운 거리', '인기', '후기 많은', '오늘 가능', '예약 가능'];

type SheetMode = 'hidden' | 'list' | 'detail';

interface MapPageProps {
  appKey: string;
}

export default function MapPage({ appKey }: MapPageProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetMode, setSheetMode] = useState<SheetMode>('hidden');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const selected = accommodations.find(
    (s: any) => s.accommodationId === selectedId,
  );

  const searchResults = accommodations.filter(
    (s: any) =>
      s.name.includes(searchQuery) ||
      (s.address?.address_short || '').includes(searchQuery) ||
      (s.address?.address_group || '').includes(searchQuery) ||
      (s.options || []).some((opt: any) =>
        (opt.name || opt).includes(searchQuery),
      ),
  );

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setSelectedId(null);
      setSheetMode('list');
    }
  };

  const handleMarkerClick = (id: number, lat: number, lng: number) => {
    setSelectedId(id);
    setSheetMode('detail');
    if (kakaoMapRef.current) {
      kakaoMapRef.current.panTo(new window.kakao.maps.LatLng(lat, lng));
    }
  };

  const handleCardClick = (s: any) => {
    setSelectedId(s.accommodationId);
    setSheetMode('detail');
    if (kakaoMapRef.current && s.address) {
      kakaoMapRef.current.panTo(
        new window.kakao.maps.LatLng(s.address.latitude, s.address.longitude),
      );
    }
  };

  // API 호출
  useEffect(() => {
    console.log('[MapPage] API 호출 시작');
    accommodationApi
      .getAll()
      .then((res) => setAccommodations(res.data))
      .catch(() => {});
  }, []);

  // 카카오맵
  useEffect(() => {
    if (accommodations.length === 0) return;

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
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

        accommodations.forEach((s: any) => {
          if (!s.address) return;
          const position = new window.kakao.maps.LatLng(
            s.address.latitude,
            s.address.longitude,
          );

          const markerStyle = getAccommodationStyle(s.accommodationId);
          const wrapper = document.createElement('div');
          wrapper.style.cursor = 'pointer';
          wrapper.innerHTML = `
            <img src="${markerStyle.markerIcon}" width="46" height="57" style="display:block;" />
          `;
          wrapper.addEventListener('click', () => {
            handleMarkerClick(
              s.accommodationId,
              s.address.latitude,
              s.address.longitude,
            );
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
            new window.kakao.maps.CustomOverlay({
              position: currentPos,
              content: `<img src="/icons/current-location.svg" width="64" height="64" style="display:block;" />`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accommodations]);

  return (
    <div style={styles.layout}>
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
              setSheetMode('hidden');
              setSelectedId(null);
            } else {
              setSelectedId(null);
              setSheetMode('list');
            }
          }}
          onKeyDown={handleSearch}
          style={styles.searchInput}
        />
      </div>

      {/* 필터 뱃지 */}
      {sheetMode === 'hidden' && (
        <div style={styles.filterRow}>
          {FILTERS.map((filter, idx) => (
            <div
              key={filter}
              style={{
                ...styles.filterBadge,
                backgroundColor: idx === selectedFilter ? '#6DBFFF' : '#fff',
                color: idx === selectedFilter ? '#fff' : '#AEAEAE',
              }}
              onClick={() => setSelectedFilter(idx)}
            >
              {filter}
            </div>
          ))}
        </div>
      )}

      {/* 오버레이 */}
      {sheetMode !== 'hidden' && (
        <div
          style={styles.overlay}
          onClick={() => {
            setSheetMode('hidden');
            setSelectedId(null);
          }}
        />
      )}

      {/* 바텀시트 */}
      <div
        style={{
          ...styles.bottomSheet,
          maxHeight: sheetMode === 'detail' ? '620px' : '480px',
          transform:
            sheetMode !== 'hidden' ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <div style={styles.handleBar}>
          <div
            style={styles.handle}
            onClick={() => {
              setSheetMode('hidden');
              setSelectedId(null);
              setSearchQuery('');
            }}
          />
        </div>

        {/* 검색 결과 리스트 */}
        {sheetMode === 'list' && (
          <div style={styles.resultList}>
            {searchResults.map((s: any) => {
              const cardStyle = getAccommodationStyle(s.accommodationId);
              return (
                <div
                  key={s.accommodationId}
                  style={styles.resultCard}
                  onClick={() => handleCardClick(s)}
                >
                  <div
                    style={{
                      ...styles.resultImage,
                      backgroundColor: cardStyle.bgColor,
                    }}
                  >
                    <img
                      src={cardStyle.houseImage}
                      alt=""
                      width={100}
                      height={72}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div style={styles.resultInfo}>
                    <span style={styles.resultLocation}>
                      {s.address?.address_short || ''}
                    </span>
                    <span style={styles.resultName}>{s.name}</span>
                    {(s.options || []).length > 0 && (
                      <div style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                        <CategoryTag
                          label={s.options[0]?.name || s.options[0]}
                          color={cardStyle.tagColor}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    style={styles.starButton}
                    onClick={(e) => toggleFavorite(s.accommodationId, e)}
                  >
                    <img
                      src={
                        favorites.includes(s.accommodationId)
                          ? '/icons/active-star.svg'
                          : '/icons/non-active-star.svg'
                      }
                      alt="즐겨찾기"
                      width={11}
                      height={11}
                    />
                  </div>
                </div>
              );
            })}
            {searchResults.length === 0 && (
              <div style={styles.noResult}>검색 결과가 없습니다.</div>
            )}
          </div>
        )}

        {/* 상세 미리보기 */}
        {sheetMode === 'detail' &&
          selected &&
          (() => {
            const detailStyle = getAccommodationStyle(selected.accommodationId);
            return (
              <div style={styles.detailContent}>
                <HouseCard
                  imageUrl={detailStyle.houseImage}
                  bgColor={detailStyle.bgColor}
                  size="card"
                />
                <div style={styles.detailInfo}>
                  <div style={styles.detailInfoInner}>
                    <span style={styles.detailLocation}>
                      {selected.address?.address_short || ''}
                    </span>
                    <span style={styles.detailName}>{selected.name}</span>
                    {(selected.options || []).length > 0 && (
                      <div style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                        <CategoryTag
                          label={
                            selected.options[0]?.name || selected.options[0]
                          }
                          color={detailStyle.tagColor}
                        />
                      </div>
                    )}
                    <p style={styles.detailDescription}>
                      {selected.description}
                    </p>
                  </div>
                  <button
                    style={styles.detailButton}
                    onClick={() =>
                      router.push(`/detail/${selected.accommodationId}`)
                    }
                  >
                    자세히 보기
                  </button>
                </div>
              </div>
            );
          })()}
      </div>

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
  map: { width: '100%', height: '100%' },
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
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 15,
  },
  bottomSheet: {
    position: 'absolute' as const,
    bottom: '80px',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: '24px 24px 0 0',
    zIndex: 20,
    transition: 'transform 0.3s ease-in-out, max-height 0.3s ease-in-out',
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
    flexDirection: 'row' as const,
    position: 'relative' as const,
    minHeight: '103px',
    border: '1px solid #E1E1E1',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  resultImage: {
    width: '120px',
    minHeight: '103px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '8px 0 0 8px',
  },
  resultInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    padding: '14px 12px',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
  },
  resultLocation: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
    color: '#A1A1A1',
  },
  resultName: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: '22px',
    letterSpacing: '-0.08px',
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
    cursor: 'pointer',
  },
  noResult: {
    padding: '40px 0',
    textAlign: 'center' as const,
    color: '#989898',
    fontSize: '14px',
  },
  detailContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '22px',
    padding: '0 20px 20px',
  },
  detailInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    width: '100%',
  },
  detailInfoInner: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '11px',
    width: '100%',
  },
  detailLocation: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '9.72px',
    fontWeight: 500,
    lineHeight: '14.58px',
    color: '#A1A1A1',
  },
  detailName: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-200, 18px)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-200, 26px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#262626',
  },
  detailDescription: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
    margin: 0,
  },
  detailButton: {
    width: '100%',
    height: '48px',
    backgroundColor: '#2B343B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-100, 16px)',
    fontWeight: 500,
    cursor: 'pointer',
  },
} as const;
