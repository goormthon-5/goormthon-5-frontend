'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImgLogo from '@/assets/images/main-logo.svg';
import ImgTangerine from '@/assets/images/tangerine.svg';
import ImgCanola from '@/assets/images/canola.svg';

export default function Splash({ onFinish }: { onFinish: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 0.1초 뒤에 아이콘들이 서서히 나타나기
    const fadeInTimer = setTimeout(() => setIsVisible(true), 100);
    // 2.5초 뒤에 온보딩으로
    const finishTimer = setTimeout(() => onFinish(), 2500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div style={S.container}>
      <style>{`
        @keyframes fadeInSway {
          from { opacity: 0; transform: scale(0.8) rotate(-10deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .icon-fade-in {
          animation: fadeInSway 2s ease-out forwards;
        }
      `}</style>

      <div style={S.centerGroup}>
        {/* 귤*/}
        {isVisible && (
          <div style={S.tangerineWrapper} className="icon-fade-in">
            <Image src={ImgTangerine} alt="귤" width={90} />
          </div>
        )}

        <Image src={ImgLogo} alt="로고" width={140} height={42} priority />

        {/* 유채꽃 */}
        {isVisible && (
          <div
            style={{ ...S.canolaWrapper, animationDelay: '0.3s' }}
            className="icon-fade-in"
          >
            <Image src={ImgCanola} alt="유채꽃" width={120} />
          </div>
        )}
      </div>
    </div>
  );
}

const S = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: '#fff',
  },
  centerGroup: { position: 'relative' as const },
  tangerineWrapper: {
    position: 'absolute' as const,
    top: '-65px',
    left: '-55px',
    opacity: 0,
  },
  canolaWrapper: {
    position: 'absolute' as const,
    bottom: '-65px',
    right: '-85px',
    opacity: 0,
  },
};
