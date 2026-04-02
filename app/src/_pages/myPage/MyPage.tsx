'use client';

import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import { Box, HStack, Text, VStack } from '@vapor-ui/core';

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
    <VStack
      $css={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      {/* 프로필 영역 */}
      <VStack
        $css={{
          alignItems: 'center',
          gap: '$250',
        }}
        style={{
          marginTop: '50px',
          paddingBottom: '26px',
        }}
      >
        <Box
          style={{
            width: '105.6px',
            height: '105.6px',
            borderRadius: '110px',
            backgroundColor: '#AFE1FC',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/main_profile.png"
            alt="프로필"
            width={106}
            height={106}
            style={{ objectFit: 'cover', borderRadius: '110px' }}
          />
        </Box>

        <Text
          style={{
            margin: 0,
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '22px',
            fontWeight: 700,
            color: '#000',
            textAlign: 'center',
            letterSpacing: '-0.33px',
          }}
        >
          <span style={{ color: '#6DBFFF' }}>제주좋아</span>
          <span> 님</span>
        </Text>

        <HStack
          $css={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{
            width: '87px',
            height: '30px',
            borderRadius: '106px',
            backgroundColor: '#2B343B',
            overflow: 'hidden',
          }}
        >
          <Text
            style={{
              margin: 0,
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '13.66px',
              fontWeight: 600,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            내 정보 수정
          </Text>
        </HStack>
      </VStack>

      {/* 구분선 */}
      <Box
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#F3F3F3',
        }}
      />

      {/* 메뉴 목록 */}
      <VStack
        $css={{
          alignItems: 'flex-start',
        }}
        style={{
          gap: '25px',
          paddingTop: '29px',
          paddingBottom: '29px',
          paddingLeft: '26px',
          paddingRight: '26px',
          marginBottom: '100px',
        }}
      >
        {MENU_ITEMS.map((item) => (
          <Box key={item} style={{ cursor: 'default' }}>
            <Text
              style={{
                margin: 0,
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                color: '#000',
                letterSpacing: '-0.3px',
              }}
            >
              {item}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </VStack>
  );
}
