'use client';

import { useRouter } from 'next/navigation';

export default function ReservationCompletePage() {
  const router = useRouter();

  return (
    <div style={styles.layout}>
      {/* 중앙 콘텐츠 */}
      <div style={styles.content}>
        {/* 체크 아이콘 */}
        <div style={styles.checkCircle}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16L14 22L24 10"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 style={styles.title}>예약이 완료되었습니다!</h1>
        <p style={styles.description}>
          방문 일정과 장소를 다시 한번 확인해 주세요.
          <br />
          삼춘이 기다리고 있을게요!
        </p>
      </div>

      {/* 하단 완료하기 */}
      <div style={styles.bottomBar}>
        <div style={styles.completeBar} onClick={() => router.push('/')}>
          <span style={styles.completeText}>완료하기</span>
        </div>
        <div style={styles.homeBar}>
          <div style={styles.homeIndicator} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#fff',
    position: 'relative' as const,
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '17px',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '251px',
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
    left: 0,
    right: 0,
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
    backgroundColor: '#2B343B',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  completeText: {
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center' as const,
    lineHeight: '100%',
  },
  homeBar: {
    width: '100%',
    height: '34px',
    backgroundColor: '#2B343B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 'var(--vapor-size-space-100)',
  },
  homeIndicator: {
    width: '134px',
    height: '5px',
    borderRadius: '100px',
    backgroundColor: '#fff',
  },
} as const;
