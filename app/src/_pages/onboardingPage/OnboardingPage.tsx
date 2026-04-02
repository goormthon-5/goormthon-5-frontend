'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, HStack, Text, VStack } from '@vapor-ui/core';
import BottomActionBar from '@/components/BottomActionBar';
import Splash from '@/components/Splash';

import ImgLogo from '@/assets/images/main-logo.svg';
import IcBack from '@/assets/icons/back-icon.svg';

const ONBOARDING_DATA = [
  {
    id: 0,
    title: '제주 삼춘과 함께하는\n여행을 경험해봐요!',
    img: '/images/onboarding-1.svg',
  },
  {
    id: 1,
    title: '삼춘네 방명록에,\n여행의 한 줄을 남겨보세요!',
    img: '/images/onboarding-2.svg',
  },
  {
    id: 2,
    title: '제주좋아님 이제\n삼춘네로 가볼까요?',
    img: '/images/onboarding-3.svg',
  },
];

export default function OnboardingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const isLastStep = step === ONBOARDING_DATA.length - 1;

  // 방문 여부 체크 (새로고침 시 온보딩 건너뛰기)
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenOnboarding');
    if (hasSeen) {
      router.replace('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleNext = () => {
    if (isLastStep) {
      localStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/');
    } else {
      setStep(step + 1);
    }
  };

  // 스플래시 종료 핸들러
  const handleSplashFinish = () => {
    setIsSplashFading(true); // 사라지는 애니메이션
    setTimeout(() => {
      setShowSplash(false);
    }, 600);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step > 0) setStep(step - 1);
  };

  // 스와이프
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return;

    if (diff > 0 && step < ONBOARDING_DATA.length - 1) {
      setStep(step + 1);
    } else if (diff < 0 && step > 0) {
      setStep(step - 1);
    }
  };

  if (isLoading) return null;

  return (
    <VStack
      onClick={!isLastStep ? handleNext : undefined}
      style={{ margin: '0 auto' }}
      $css={{
        width: '100%',
        maxWidth: '390px',
        height: '100vh',
        backgroundColor: '#fff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 스플래시 영역 */}
      {showSplash && (
        <Box
          style={{
            ...styles.splashOverlay,
            opacity: isSplashFading ? 0 : 1,
          }}
        >
          <Splash onFinish={handleSplashFinish} />
        </Box>
      )}

      {/* 온보딩 */}
      {!showSplash && (
        <VStack
          style={styles.contentFadeIn}
          $css={{ width: '100%', height: '100%' }}
        >
          <header style={styles.header}>
            <HStack
              $css={{
                height: '100%',
                paddingInline: '$250',
                alignItems: 'center',
              }}
            >
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  style={styles.backBtn}
                >
                  <Image src={IcBack} alt="뒤로가기" width={24} height={24} />
                </button>
              )}
            </HStack>
          </header>

          <HStack
            style={{
              transform: `translateX(-${step * 100}%)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            $css={{
              width: '100%',
              height: '100%',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {ONBOARDING_DATA.map((item) => (
              <VStack key={item.id} $css={{ minWidth: '100%', height: '100%' }}>
                <main style={styles.main}>
                  <VStack
                    style={{ paddingTop: '100px' }}
                    $css={{
                      flex: 1,
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Box style={{ marginBottom: '42.47px' }}>
                      <Image
                        src={ImgLogo}
                        alt="로고"
                        width={143.29}
                        height={40.53}
                        priority
                      />
                    </Box>
                    <Text
                      render={<p />}
                      style={{ marginBlock: 0, marginInline: 0 }}
                      $css={{
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: '1.4',
                        whiteSpace: 'pre-line',
                        color: '#2B343B',
                      }}
                    >
                      {item.title}
                    </Text>
                    <HStack
                      style={{ marginTop: '46px' }}
                      $css={{
                        gap: '$100',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {ONBOARDING_DATA.map((_, idx) => (
                        <Box
                          key={idx}
                          $css={{
                            width: '$100',
                            height: '$100',
                            borderRadius: '50%',
                            transition: 'background-color 0.3s',
                            backgroundColor:
                              idx === step ? '#6DBFFF' : '#E1E1E1',
                          }}
                        />
                      ))}
                    </HStack>
                  </VStack>
                </main>
                <footer style={styles.footer}>
                  <Box
                    $css={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={item.img}
                      alt="onboarding"
                      fill
                      style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                      priority
                    />
                  </Box>
                </footer>
              </VStack>
            ))}
          </HStack>

          {isLastStep && (
            <BottomActionBar label="시작하기" onClick={handleNext} />
          )}
        </VStack>
      )}
    </VStack>
  );
}

const styles = {
  splashOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    transition: 'opacity 0.6s ease-in-out',
  },
  contentFadeIn: {
    animation: 'fadeIn 0.5s ease-in',
  },
  header: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    zIndex: 20,
  },
  main: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    paddingTop: 'min(100px, 12vh)',
    flex: '0 0 auto',
  },
  logoWrapper: { marginBottom: 'min(42px, 5vh)' },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.4',
    whiteSpace: 'pre-line' as const,
    color: '#2B343B',
    margin: 0,
  },
  indicatorWrapper: {
    display: 'flex',
    gap: '8px',
    marginTop: 'min(46px, 5vh)',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s',
    minHeight: 0,
  },
  footer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  backBtn: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    paddingBlock: 0,
    paddingInline: 0,
  },
} as const;
