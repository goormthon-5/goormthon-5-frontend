'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Button, HStack, Text, TextInput, VStack } from '@vapor-ui/core';
import BottomNavBar from '@/components/BottomNavBar';
import HouseCard from '@/components/HouseCard';
import CategoryTag from '@/components/CategoryTag';
import Spinner from '@/components/Spinner';
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

export default function MapPage() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleCardClick = (s: any) => {
    setSelectedId(s.accommodationId);
    setSheetMode('detail');
    if (kakaoMapRef.current && s.address) {
      kakaoMapRef.current.panTo(
        new window.kakao.maps.LatLng(s.address.latitude, s.address.longitude),
      );
    }
  };

  useEffect(() => {
    accommodationApi
      .getAll()
      .then((res) => setAccommodations(res.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (accommodations.length === 0) return;

    const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!appKey) return;

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
    <>
      <Spinner loading={isLoading} />

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
              } else {
                setSelectedId(null);
                setSheetMode('list');
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

        {/* 오버레이 */}
        {sheetMode !== 'hidden' && (
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
            transition:
              'transform 0.3s ease-in-out, max-height 0.3s ease-in-out',
          }}
        >
          <HStack
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
                    {s.cost != null && (
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#2B343B' }}>
                        {s.cost.toLocaleString()}원<span style={{ fontSize: '10px', fontWeight: 400, color: '#A1A1A1' }}> /박</span>
                      </span>
                    )}
                    {s.accommodationHostInfo && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {s.accommodationHostInfo.personality && (
                          <span style={styles.infoTag}>{s.accommodationHostInfo.personality}</span>
                        )}
                        {s.accommodationHostInfo.trait && (
                          <span style={styles.infoTag}>{s.accommodationHostInfo.trait}</span>
                        )}
                        {s.accommodationHostInfo.hasWifi != null && (
                          <span style={{
                            ...styles.infoTag,
                            backgroundColor: '#F5F5F5',
                            padding: '2px 5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}>
                            <img
                              src={s.accommodationHostInfo.hasWifi ? '/icons/wifi-o.svg' : '/icons/wifi-x.svg'}
                              alt={s.accommodationHostInfo.hasWifi ? 'Wi-Fi 가능' : 'Wi-Fi 불가'}
                              width={14}
                              height={14}
                            />
                          </span>
                        )}
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
                    {selected.cost != null && (
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#2B343B' }}>
                        {selected.cost.toLocaleString()}원<span style={{ fontSize: '12px', fontWeight: 400, color: '#A1A1A1' }}> /박</span>
                      </span>
                    )}
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
                    {selected.accommodationHostInfo && (
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {selected.accommodationHostInfo.personality && (
                          <span style={styles.infoTag}>{selected.accommodationHostInfo.personality}</span>
                        )}
                        {selected.accommodationHostInfo.trait && (
                          <span style={styles.infoTag}>{selected.accommodationHostInfo.trait}</span>
                        )}
                        {selected.accommodationHostInfo.cleanlinessLevel && (
                          <span style={styles.infoTag}>
                            {({ LV1: '보통', LV2: '깔끔', LV3: '매우 깔끔' } as Record<string, string>)[selected.accommodationHostInfo.cleanlinessLevel] || selected.accommodationHostInfo.cleanlinessLevel}
                          </span>
                        )}
                        {selected.accommodationHostInfo.hasWifi != null && (
                          <span style={{
                            ...styles.infoTag,
                            backgroundColor: '#F5F5F5',
                            padding: '2px 5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}>
                            <img
                              src={selected.accommodationHostInfo.hasWifi ? '/icons/wifi-o.svg' : '/icons/wifi-x.svg'}
                              alt={selected.accommodationHostInfo.hasWifi ? 'Wi-Fi 가능' : 'Wi-Fi 불가'}
                              width={16}
                              height={16}
                            />
                          </span>
                        )}
                      </div>
                    )}
                    <p style={styles.detailDescription}>
                      {selected.description}
                    </p>
                  </div>
                  <button
                    style={styles.detailButton}
                    onClick={() => {
                      const accId = Number(
                        selected.accommodationId ?? selected.id,
                      );
                      if (!Number.isFinite(accId)) return;
                      router.push(`/reservation/detail/${accId}`);
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
              style={{ maxHeight: '430px', paddingTop: '10px' }}
              $css={{
                gap: '10px',
                paddingInline: '$250',
                paddingBottom: '$250',
                overflowY: 'auto',
              }}
            >
              {searchResults.map((s: any) => {
                const cardStyle = getAccommodationStyle(s.accommodationId);
                return (
                  <HStack
                    key={s.accommodationId}
                    onClick={() => handleCardClick(s)}
                    $css={{
                      position: 'relative',
                      minHeight: '103px',
                      border: '1px solid #E1E1E1',
                      borderRadius: '$300',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                    }}
                  >
                    <HStack
                      style={{ width: '120px', minHeight: '103px' }}
                      $css={{
                        flexShrink: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        borderRadius: '8px 0 0 8px',
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
                    </HStack>
                    <VStack
                      $css={{
                        gap: '6px',
                        paddingBlock: '$175',
                        paddingInline: '$150',
                        flex: 1,
                        minWidth: 0,
                        overflow: 'hidden',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Text style={styles.resultLocation}>
                        {s.address?.address_short || ''}
                      </Text>
                      <Text style={styles.resultName}>{s.name}</Text>
                      {(s.options || []).length > 0 && (
                        <Box $css={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                          <CategoryTag
                            label={s.options[0]?.name || s.options[0]}
                            color={cardStyle.tagColor}
                          />
                        </Box>
                      )}
                    </VStack>
                    <HStack
                      onClick={(e) => toggleFavorite(s.accommodationId, e)}
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
                          favorites.includes(s.accommodationId)
                            ? '/icons/active-star.svg'
                            : '/icons/non-active-star.svg'
                        }
                        alt="즐겨찾기"
                        width={11}
                        height={11}
                      />
                    </HStack>
                  </HStack>
                );
              })}
              {searchResults.length === 0 && (
                <Text
                  style={{ paddingBlock: '40px', paddingInline: 0 }}
                  $css={{
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
          {sheetMode === 'detail' && selected && (
            <DetailPreview
              selected={selected}
              router={router}
              getAccommodationStyle={getAccommodationStyle}
            />
          )}
        </VStack>

        <BottomNavBar />
      </Box>
    </>
  );
}

function DetailPreview({
  selected,
  router,
  getAccommodationStyle,
}: {
  selected: any;
  router: ReturnType<typeof useRouter>;
  getAccommodationStyle: typeof import('@/utils/accommodationStyle').getAccommodationStyle;
}) {
  const detailStyle = getAccommodationStyle(selected.accommodationId);
  return (
    <VStack
      style={{ gap: '22px' }}
      $css={{
        paddingInline: '$250',
        paddingBottom: '$250',
      }}
    >
      <HouseCard
        imageUrl={detailStyle.houseImage}
        bgColor={detailStyle.bgColor}
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
            {selected.address?.address_short || ''}
          </Text>
          <Text style={styles.detailName}>{selected.name}</Text>
          {(selected.options || []).length > 0 && (
            <Box $css={{ flexShrink: 0, alignSelf: 'flex-start' }}>
              <CategoryTag
                label={selected.options[0]?.name || selected.options[0]}
                color={detailStyle.tagColor}
              />
            </Box>
          )}
          <Text render={<p />} style={styles.detailDescription}>
            {selected.description}
          </Text>
        </VStack>
        <Button
          type="button"
          variant="fill"
          colorPalette="contrast"
          size="xl"
          onClick={() => router.push(`/detail/${selected.accommodationId}`)}
          style={{ width: '100%', height: '48px' }}
          $css={{
            paddingBlock: '$000',
            paddingInline: '$000',
            borderRadius: '$300',
            border: 'none',
            backgroundColor: '#2B343B',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <Text
            $css={{
              color: '#fff',
              fontSize: 'var(--vapor-typography-fontSize-100, 16px)',
              fontWeight: 500,
            }}
          >
            자세히 보기
          </Text>
        </Button>
      </VStack>
    </VStack>
  );
}

const styles = {
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
    marginBlock: 0,
    marginInline: 0,
  },
  infoTag: {
    fontSize: '10px',
    fontWeight: 500,
    color: '#666',
    backgroundColor: '#F5F5F5',
    borderRadius: '10px',
    padding: '2px 6px',
    whiteSpace: 'nowrap' as const,
  },
} as const;
