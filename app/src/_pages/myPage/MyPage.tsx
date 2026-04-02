'use client';

import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';

const MENU_ITEMS = [
  '포인트',
  '내 쿠폰',
  '결제수단 관리',
  '이벤트',
  '알림',
  '1:1 문의하기',
  '자주 묻는 질문 (FAQ)',
  '공지사항',
  '회원정보 수정',
  '약관 및 개인정보 처리 동의',
  '개인정보 처리방침',
];

export default function MyPage() {
  return (
    <div style={styles.layout}>
      {/* 프로필 영역 */}
      <div style={styles.profileSection}>
        <div style={styles.profileImage}>
          <Image
            src="/images/profile.png"
            alt="프로필"
            width={106}
            height={106}
            style={{ objectFit: 'cover', borderRadius: '110px' }}
          />
        </div>
        <p style={styles.nickname}>
          <span style={{ color: '#6DBFFF' }}>제주좋아</span>
          <span> 님</span>
        </p>
        <div style={styles.editButton}>
          <span style={styles.editButtonText}>내 정보 수정</span>
        </div>
      </div>

      {/* 구분선 */}
      <div style={styles.divider} />

      {/* 메뉴 목록 */}
      <div style={styles.menuList}>
        {MENU_ITEMS.map((item) => (
          <div key={item} style={styles.menuItem}>
            <span style={styles.menuText}>{item}</span>
          </div>
        ))}
      </div>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
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
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '5.5px',
    marginTop: '50px',
    paddingBottom: '26px',
  },
  profileImage: {
    width: '105.6px',
    height: '105.6px',
    borderRadius: '110px',
    backgroundColor: '#AFE1FC',
    overflow: 'hidden',
  },
  nickname: {
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '22px',
    fontWeight: 700,
    color: '#000',
    textAlign: 'center' as const,
    letterSpacing: '-0.33px',
    margin: 0,
  },
  editButton: {
    width: '87px',
    height: '30px',
    borderRadius: '106px',
    backgroundColor: '#2B343B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  editButtonText: {
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '13.66px',
    fontWeight: 600,
    color: '#fff',
    textAlign: 'center' as const,
  },
  divider: {
    width: '100%',
    height: '10px',
    backgroundColor: '#F3F3F3',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '25px',
    padding: '36px 29px',
    paddingBottom: '120px',
  },
  menuItem: {
    cursor: 'default',
  },
  menuText: {
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '18px',
    fontWeight: 500,
    color: '#000',
    letterSpacing: '-0.3px',
  },
} as const;
