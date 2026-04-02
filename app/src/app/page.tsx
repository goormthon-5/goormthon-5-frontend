'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HStack, IconButton, Text, TextInput, VStack } from '@vapor-ui/core';
import RatingBadge from '@/components/RatingBadge';
import SamchonCard from '@/components/SamchonCard';
import { accommodationApi } from '@/apis/accommodationApi';
import { getAccommodationStyle } from '@/utils/accommodationStyle';
import DataSearch from '@/components/main/DataSearch';
import BottomNavBar from '@/components/BottomNavBar';
import Spinner from '@/components/Spinner';
import ImgLogo from '@/assets/images/main-logo.svg';
import IcMenu from '@/assets/icons/menu-icon.svg';
import IcBell from '@/assets/icons/bell-icon.svg';
import IcSearch from '@/assets/icons/search-icon.svg';

export default function Home() {
  const router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const name: string = '제주좋아';

  const filteredAccommodations = accommodations.filter((s: any) => {
    // 지역 탭 필터
    const area = AREAS[selectedIdx];
    if (area.keywords.length > 0) {
      const short = s.address?.address_short || '';
      const matchArea = area.keywords.some((kw) => short.includes(kw));
      if (!matchArea) return false;
    }

    // 검색어 필터
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    const nameMatch = s.name?.toLowerCase().includes(q);
    const addressMatch = (s.address?.address_short || '').toLowerCase().includes(q)
      || (s.address?.address_group || '').toLowerCase().includes(q);
    const tagMatch = (s.options || []).some(
      (opt: any) => (opt.name || opt).toLowerCase().includes(q),
    );
    return nameMatch || addressMatch || tagMatch;
  });

  // 온보딩 체크 로직
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenOnboarding');

    if (!hasSeen) {
      router.replace('/onboarding');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // 숙소 목록 API 호출
  useEffect(() => {
    setIsListLoading(true);
    accommodationApi
      .getAll()
      .then((res) => setAccommodations(res.data))
      .catch(() => {})
      .finally(() => setIsListLoading(false));
  }, []);

  return (
    <>
      <Spinner loading={isListLoading} />
      <VStack
      $css={{
        width: '100%',
        maxWidth: '390px',
        margin: '0 auto',
        minHeight: '100vh',
        paddingBlock: '$250',
        paddingInline: '$250',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <header>
        <HStack
          $css={{
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBlock: '$250',
            paddingInline: '$000',
            width: '100%',
          }}
        >
          <VStack
            $css={{
              width: '84px',
              height: '24px',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <Image
              src={ImgLogo}
              alt="메인 로고"
              fill
              style={{ objectFit: 'contain' }}
            />
          </VStack>

          <HStack $css={{ gap: '7px', alignItems: 'center' }}>
            <IconButton aria-label="메뉴 열기" size="md" variant="ghost">
              <Image src={IcMenu} alt="메뉴 아이콘" width={28} height={28} />
            </IconButton>
            <IconButton aria-label="알림" size="md" variant="ghost">
              <Image src={IcBell} alt="벨 아이콘" width={28} height={28} />
            </IconButton>
          </HStack>
        </HStack>
      </header>

      <main>
        <VStack
          $css={{
            gap: '26px',
            width: '100%',
          }}
        >
          <VStack $css={{ marginBottom: '5px', width: '100%' }}>
            <Text
              typography="heading3"
              $css={{
                color: '#2B343B',
                whiteSpace: 'pre-line',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {`안녕하세요! ${name}님\n같이 삼춘네로 가볼까요?`}
            </Text>
          </VStack>

          <VStack $css={{ gap: '10px', width: '100%' }}>
            <DataSearch onDateChange={(date: Date | null) => setSelectedDate(date)} />

            <HStack
              $css={{
                alignItems: 'center',
                width: '100%',
                maxWidth: '350px',
                height: '48px',
                paddingInline: '$175',
                borderRadius: '8px',
                border: '1px solid #E1E1E1',
                gap: '$100',
              }}
            >
              <Image src={IcSearch} alt="" width={18} height={18} />
              <TextInput
                type="search"
                placeholder="이름, 주소, 태그로 검색"
                aria-label="이름, 주소, 태그로 검색"
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
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
                  marginLeft: '8px',
                  fontSize: '14.4px',
                  outline: 'none',
                }}
              />
            </HStack>
          </VStack>

          <nav style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <HStack
              $css={{
                gap: '24px',
                borderBottom: '1px solid #F3F4F6',
                position: 'relative',
                width: 'max-content',
                minWidth: '100%',
              }}
            >
              {AREAS.map((area, idx) => (
                <VStack
                  key={area.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedIdx(idx);
                    }
                  }}
                  $css={{
                    alignItems: 'center',
                    cursor: 'pointer',
                    paddingBlock: '$100',
                    paddingInline: '$050',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <Text
                    typography="subtitle1"
                    $css={{
                      fontWeight: 500,
                      color: idx === selectedIdx ? '#6DBFFF' : '#555555',
                      transition: 'color 0.2s',
                    }}
                  >
                    {area.name}
                  </Text>
                  {idx === selectedIdx ? (
                    <VStack
                      $css={{
                        height: '2px',
                        backgroundColor: '#6DBFFF',
                        width: '100%',
                        position: 'absolute',
                        bottom: '-1px',
                        zIndex: 1,
                      }}
                    />
                  ) : null}
                </VStack>
              ))}
            </HStack>
          </nav>

          <section>
            <VStack
              $css={{ gap: '17px', paddingBottom: '80px', width: '100%' }}
            >
              <Text
                render={<h2 />}
                typography="heading5"
                $css={{
                  color: '#1F1F1F',
                  margin: '0 0 4px 0',
                }}
              >
                삼춘 목록
              </Text>

              {!isListLoading &&
                filteredAccommodations.length === 0 &&
                searchQuery.trim() && (
                <Text
                  $css={{
                    textAlign: 'center',
                    color: '#989898',
                    paddingBlock: '$400',
                    fontSize: '14px',
                  }}
                >
                  검색 결과가 없습니다.
                </Text>
              )}

              {filteredAccommodations.map((s: any) => {
                const accId = Number(s.accommodationId ?? s.id);
                if (!Number.isFinite(accId)) return null;
                const style = getAccommodationStyle(accId);
                return (
                  <SamchonCard
                    key={accId}
                    imageUrl={style.houseImage}
                    bgColor={style.bgColor}
                    location={s.address?.address_short || ''}
                    name={s.name}
                    renderRightTop={
                      <RatingBadge
                        rating={s.averageRating || 0}
                        reviewCount={s.guestBookCount || 0}
                      />
                    }
                    tags={(s.options || []).slice(0, 1).map((opt: any) => ({
                      label: opt.name || opt,
                      color: style.tagColor,
                    }))}
                    onClick={() =>
                      router.push(`/reservation/detail/${accId}`)
                    }
                  />
                );
              })}
            </VStack>
          </section>
        </VStack>
      </main>
      <BottomNavBar />
    </VStack>
    </>
  );
}

const AREAS = [
  { name: '전체', keywords: [] },
  { name: '성산·구좌', keywords: ['성산읍', '구좌읍', '우도면'] },
  { name: '서귀포·남원', keywords: ['남원읍', '표선면'] },
  { name: '한림·애월', keywords: ['한림읍', '애월읍', '한경면'] },
  { name: '대정·안덕', keywords: ['대정읍', '안덕면'] },
  { name: '조천·추자', keywords: ['조천읍', '추자면'] },
];
