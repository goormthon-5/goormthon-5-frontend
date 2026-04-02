'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Text, VStack } from '@vapor-ui/core';
import ImgHareubang from '@/assets/images/hareubang.svg';
import BottomActionBar from '@/components/main/BottomActionBar';

export default function ReservationCompletePage() {
  const router = useRouter();

  return (
    <VStack
      $css={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 중앙 콘텐츠 */}
      <VStack
        style={styles.content}
        $css={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Image src={ImgHareubang} alt="돌하르방" width={174} height={125} />

        <Text render={<h1 />} style={styles.title}>
          예약이 완료되었습니다!
        </Text>

        <Text render={<p />} style={styles.description}>
          방문 일정과 장소를 다시 한번 확인해 주세요.
          <br />
          삼춘이 기다리고 있을게요!
        </Text>
      </VStack>

      {/* 하단 완료하기 */}
      <BottomActionBar
        label="완료"
        onClick={() => router.push('/reservation')}
      />
    </VStack>
  );
}

const styles = {
  content: {
    gap: '17px',
    width: '100%',
    maxWidth: '251px',
    alignSelf: 'center',
    paddingBottom: '94px',
  },
  checkCircle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#6DBFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '21.6px',
    fontWeight: 700,
    lineHeight: '31.2px',
    letterSpacing: '-0.12px',
    color: '#262626',
    textAlign: 'center' as const,
    margin: 0,
    width: '100%',
  },
  description: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
    textAlign: 'center' as const,
    margin: 0,
    width: '100%',
  },
  bottomBar: {
    position: 'fixed' as const,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    maxWidth: '390px',
  },
  completeBar: {
    width: '100%',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  completeText: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center' as const,
    lineHeight: '100%',
  },
  homeBar: {
    width: '100%',
    height: '34px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 'var(--vapor-size-space-100)',
  },
  homeIndicator: {
    width: '134px',
    height: '5px',
    borderRadius: '100px',
  },
} as const;
