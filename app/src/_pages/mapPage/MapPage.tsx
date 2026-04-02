'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, HStack, Text, TextInput, VStack } from '@vapor-ui/core';
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

type SheetMode = 'hidden' | 'list' | 'detail';

export default function MapPage() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetMode, setSheetMode] = useState<SheetMode>('hidden');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const selectedSamchon = samchons.find((s) => s.id === selectedId);

  const searchResults = samchons.filter(
    (s) =>
      s.name.includes(searchQuery) ||
      s.location.includes(searchQuery) ||
      s.area.includes(searchQuery) ||
      s.tags.some((t) => t.label.includes(searchQuery)),
  );

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
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

  const handleCardClick = (s: (typeof samchons)[0]) => {
    setSelectedId(s.id);
    setSheetMode('detail');
    if (kakaoMapRef.current) {
      kakaoMapRef.current.panTo(
        new window.kakao.maps.LatLng(s.latitude, s.longitude),
      );
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
            handleMarkerClick(s.id, s.latitude, s.longitude);
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
  }, []);

  return (
    <Box
      $css={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box ref={mapRef} $css={{ width: '100%', height: '100%' }} />

      {/* 검색바 */}
      <HStack
        style={{
          position: 'absolute',
          top: 'var(--vapor-size-space-250)',
          left: 'var(--vapor-size-space-250)',
          right: 'var(--vapor-size-space-250)',
          maxWidth: '350px',
          height: '48px',
          zIndex: 10,
        }}
        $css={{
          alignItems: 'center',
          gap: '7px',
          paddingInline: '$200',
          paddingBlock: '$000',
          backgroundColor: '#fff',
          border: '1px solid #E1E1E1',
          borderRadius: '$300',
        }}
      >
        <Image src={IcSearch} alt="검색" width={18} height={18} />
        <TextInput
          type="text"
          placeholder="마을 이름, 어르신 이름으로 검색"
          aria-label="마을 이름, 어르신 이름으로 검색"
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
            if (!value.trim()) {
              setSheetMode('hidden');
              setSelectedId(null);
            }
          }}
          onKeyDown={handleSearch}
          $css={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            alignSelf: 'stretch',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent',
            paddingBlock: '$000',
            paddingInline: '$000',
            fontSize: '14.4px',
            fontWeight: 500,
            color: '#333',
            outline: 'none',
          }}
        />
      </HStack>

      {/* 필터 뱃지 */}
      {sheetMode === 'hidden' && (
        <HStack
          style={{
            position: 'absolute',
            top: '78px',
            left: 'var(--vapor-size-space-250)',
            zIndex: 10,
          }}
          $css={{ gap: '$100' }}
        >
          {FILTERS.map((filter, idx) => (
            <HStack
              key={filter}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedFilter(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedFilter(idx);
                }
              }}
              $css={{
                height: '$300',
                paddingInline: '$100',
                paddingBlock: '$000',
                borderRadius: '$500',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backgroundColor: idx === selectedFilter ? '#6DBFFF' : '#fff',
                color: idx === selectedFilter ? '#fff' : '#AEAEAE',
              }}
            >
              <Text
                $css={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'inherit',
                }}
              >
                {filter}
              </Text>
            </HStack>
          ))}
        </HStack>
      )}

      {/* 어두운 오버레이 (상세 모드) */}
      {sheetMode === 'detail' && (
        <Box
          $css={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 15,
          }}
          onClick={() => {
            setSheetMode('hidden');
            setSelectedId(null);
          }}
        />
      )}

      {/* 바텀시트 */}
      <VStack
        style={{
          maxHeight: sheetMode === 'detail' ? '620px' : '480px',
          transform:
            sheetMode !== 'hidden' ? 'translateY(0)' : 'translateY(100%)',
        }}
        $css={{
          position: 'absolute',
          bottom: '80px',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderRadius: '24px 24px 0 0',
          zIndex: 20,
          transition: 'transform 0.3s ease-in-out, max-height 0.3s ease-in-out',
        }}
      >
        <HStack
          onClick={() => {
            setSheetMode('hidden');
            setSelectedId(null);
          }}
          $css={{
            justifyContent: 'center',
            paddingBlock: '$100',
            paddingInline: '$000',
            backgroundColor: '#fff',
            borderRadius: '24px 24px 0 0',
            cursor: 'pointer',
          }}
        >
          <Box
            $css={{
              width: '44px',
              height: '4px',
              borderRadius: '$050',
              backgroundColor: '#DEDEDE',
            }}
          />
        </HStack>

        {/* 검색 결과 리스트 */}
        {sheetMode === 'list' && (
          <VStack
            $css={{
              gap: '10px',
              paddingTop: '$100',
              paddingInline: '$250',
              paddingBottom: '$250',
              overflowY: 'auto',
              maxHeight: '430px',
            }}
          >
            {searchResults.map((s) => (
              <HStack
                key={s.id}
                onClick={() => handleCardClick(s)}
                $css={{
                  position: 'relative',
                  height: '103px',
                  border: '1px solid #E1E1E1',
                  borderRadius: '$300',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                }}
              >
                <HStack
                  $css={{
                    width: '132px',
                    height: '103px',
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: '8px 0 0 8px',
                    borderRight: '1px solid #E1E1E1',
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
                </HStack>
                <VStack
                  $css={{
                    gap: '7px',
                    paddingBlock: '$200',
                    paddingInline: '$150',
                    flex: 1,
                    overflow: 'hidden',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.resultLocation}>{s.location}</Text>
                  <Text style={styles.resultName}>{s.name}</Text>
                  <Box $css={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                    <CategoryTag
                      label={s.tags[0].label}
                      color={
                        TAG_COLORS[s.tags[0].color as keyof typeof TAG_COLORS]
                      }
                    />
                  </Box>
                </VStack>
                <HStack
                  onClick={(e) => toggleFavorite(s.id, e)}
                  $css={{
                    position: 'absolute',
                    top: '$200',
                    right: '$200',
                    width: '18px',
                    height: '17px',
                    borderRadius: '$500',
                    backgroundColor: '#E0F4FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
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
                </HStack>
              </HStack>
            ))}
            {searchResults.length === 0 && (
              <Text
                $css={{
                  paddingBlock: '40px',
                  paddingInline: '$000',
                  textAlign: 'center',
                  color: '#989898',
                  fontSize: '14px',
                }}
              >
                검색 결과가 없습니다.
              </Text>
            )}
          </VStack>
        )}

        {/* 상세 미리보기 */}
        {sheetMode === 'detail' && selectedSamchon && (
          <VStack
            $css={{
              gap: '22px',
              paddingInline: '$250',
              paddingBottom: '$250',
            }}
          >
            <HouseCard
              imageUrl={selectedSamchon.imageUrl}
              bgColor={selectedSamchon.bgColor}
              size="card"
            />
            <VStack $css={{ gap: '$250', width: '100%' }}>
              <VStack
                $css={{
                  gap: '11px',
                  width: '100%',
                  alignItems: 'flex-start',
                }}
              >
                <Text style={styles.detailLocation}>
                  {selectedSamchon.location}
                </Text>
                <Text style={styles.detailName}>{selectedSamchon.name}</Text>
                <Box $css={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                  <CategoryTag
                    label={selectedSamchon.tags[0].label}
                    color={
                      TAG_COLORS[
                        selectedSamchon.tags[0].color as keyof typeof TAG_COLORS
                      ]
                    }
                  />
                </Box>
                <Text render={<p />} style={styles.detailDescription}>
                  {selectedSamchon.description}
                </Text>
              </VStack>
              <button
                type="button"
                style={styles.detailButton}
                onClick={() => router.push(`/detail/${selectedSamchon.id}`)}
              >
                자세히 보기
              </button>
            </VStack>
          </VStack>
        )}
      </VStack>

      <BottomNavBar />
    </Box>
  );
}

const styles = {
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
