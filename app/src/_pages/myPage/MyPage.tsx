'use client';

import { useState } from 'react';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import ActionButton from '@/components/ActionButton';
import Modal from '@/components/Modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <VStack
        $css={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#fff',
        }}
      >
        {/* 프로필 영역 */}
        <VStack
          $css={{ alignItems: 'center', gap: '$250' }}
          style={{ marginTop: '50px', paddingBottom: '26px' }}
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
            onClick={handleOpenModal}
            $css={{
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
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

        <Box
          style={{ width: '100%', height: '10px', backgroundColor: '#F3F3F3' }}
        />

        {/* 메뉴 목록 */}
        <VStack
          $css={{ alignItems: 'flex-start' }}
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
            <Box
              key={item}
              onClick={handleOpenModal}
              style={{ cursor: 'pointer', width: '100%' }}
            >
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

        <BottomNavBar />
      </VStack>

      {/* 공통 Modal 컴포넌트 이용 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <VStack $css={{ alignItems: 'center', gap: '30px', width: '100%' }}>
          <Text
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2B343B',
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            오픈 예정입니다!
          </Text>

          <ActionButton
            label="확인"
            variant="dark"
            showPlus={false}
            onClick={handleCloseModal}
          />
        </VStack>
      </Modal>
    </>
  );
}
