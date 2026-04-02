'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BottomActionBar from '@/components/BottomActionBar';

import ImgLogo from '@/assets/images/main-logo.svg';
import IcBack from '@/assets/icons/back-icon.svg';

const ONBOARDING_DATA = [
  {
    id: 0,
    title: '제주 삼춘과 함께하는\n여행을 경험해봐요!',
    img: '/images/onboarding-1.png',
  },
  {
    id: 1,
    title: '삼춘네 방명록에,\n여행의 한 줄을 남겨보세요!',
    img: '/images/onboarding-2.png',
  },
  {
    id: 2,
    title: '제주좋아님 이제\n삼춘네로 가볼까요?',
    img: '/images/onboarding-3.png',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const isLastStep = step === ONBOARDING_DATA.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      router.push('/');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step > 0) setStep(step - 1);
  };

  return (
    <div style={S.layout} onClick={!isLastStep ? handleNext : undefined}>
      {/* 상단 헤더 */}
      <header style={S.header}>
        {step > 0 && (
          <button onClick={handleBack} style={S.backBtn}>
            <Image src={IcBack} alt="뒤로가기" width={24} height={24} />
          </button>
        )}
      </header>

      {/* 가로 슬라이드 컨테이너 */}
      <div
        style={{
          ...S.slideContainer,
          transform: `translateX(-${step * 100}%)`,
        }}
      >
        {ONBOARDING_DATA.map((item) => (
          <div key={item.id} style={S.slidePage}>
            <main style={S.main}>
              <div style={S.logoWrapper}>
                <Image
                  src={ImgLogo}
                  alt="로고"
                  width={143.29}
                  height={40.53}
                  priority
                />
              </div>

              <p style={S.title}>{item.title}</p>

              <div style={S.indicatorWrapper}>
                {ONBOARDING_DATA.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...S.dot,
                      backgroundColor: idx === step ? '#6DBFFF' : '#E1E1E1',
                    }}
                  />
                ))}
              </div>
            </main>

            <footer style={S.footer}>
              <div style={S.imageBox}>
                <Image
                  src={item.img}
                  alt="onboarding"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                  priority
                />
              </div>
            </footer>
          </div>
        ))}
      </div>

      {isLastStep && <BottomActionBar label="시작하기" onClick={handleNext} />}
    </div>
  );
}

const S = {
  layout: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '390px',
    height: '100vh',
    margin: '0 auto',
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative' as const,
  },
  header: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 20,
  },
  backBtn: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  slideContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
  },
  slidePage: {
    minWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    paddingTop: '100px',
  },
  logoWrapper: {
    marginBottom: '42.47px',
  },
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
    marginTop: '46px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s',
  },
  footer: {
    width: '100%',
    height: '45vh',
    display: 'flex',
    alignItems: 'flex-end',
  },
  imageBox: {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
  },
};
