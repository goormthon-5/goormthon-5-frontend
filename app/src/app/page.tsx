'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HStack, IconButton, Text, TextInput, VStack } from '@vapor-ui/core';
import SamchonCard from '@/components/SamchonCard';
import { accommodationApi } from '@/apis/accommodationApi';
import DataSearch from '@/components/main/DataSearch';
import BottomNavBar from '@/components/BottomNavBar';
import ImgLogo from '@/assets/images/main-logo.svg';
import IcMenu from '@/assets/icons/menu-icon.svg';
import IcBell from '@/assets/icons/bell-icon.svg';
import IcSearch from '@/assets/icons/search-icon.svg';

export default function Home() {
  const router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [accommodations, setAccommodations] = useState<any[]>([]);

  const name: string = '제주좋아';

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
    accommodationApi
      .getAll()
      .then((res) => setAccommodations(res.data))
      .catch(() => {});
  }, []);

  return (
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
              render={<h1 />}
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
            <DataSearch />

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
                placeholder="마을 이름, 어르신 이름으로 검색"
                aria-label="마을 이름, 어르신 이름으로 검색"
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

          <nav>
            <HStack
              $css={{
                gap: '24px',
                borderBottom: '1px solid #F3F4F6',
                position: 'relative',
                width: '100%',
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

              {accommodations.map((s: any) => (
                <SamchonCard
                  key={s.accommodationId}
                  imageUrl={s.imageUrl || ''}
                  bgColor="#E0F4FF"
                  location={s.address?.address_short || ''}
                  name={s.name}
                  rating={s.averageRating || 0}
                  reviewCount={s.guestBookCount || 0}
                  tags={(s.options || []).slice(0, 1).map((opt: any) => ({
                    label: opt.name || opt,
                    color: '#6DBFFF',
                  }))}
                  onClick={() => router.push(`/detail/${s.accommodationId}`)}
                />
              ))}
            </VStack>
          </section>
        </VStack>
      </main>
      <BottomNavBar />
    </VStack>
  );
}

const AREAS = [
  { name: '전체' },
  { name: '성산·구좌' },
  { name: '서귀포·남원' },
];
