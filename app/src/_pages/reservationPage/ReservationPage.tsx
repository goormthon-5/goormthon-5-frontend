'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, HStack, Text, VStack } from '@vapor-ui/core';

import SamchonCard from '@/components/SamchonCard';
import ActionButton from '@/components/ActionButton';
import BottomNavBar from '@/components/BottomNavBar';
import Modal from '@/components/Modal';
import GuestbookModal from '@/components/reservation/GuestbookModal';

import { reservationApi } from '@/apis/reservationApi';
import { accommodationApi } from '@/apis/accommodationApi';
import { getAccommodationStyle } from '@/utils/accommodationStyle';

export default function ReservationPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSamchon, setSelectedSamchon] = useState<string>(''); // 어떤 삼춘네인지 표시용

  const handleOpenModal = (name: string) => {
    setSelectedSamchon(name);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveGuestbook = (data: {
    rating: number;
    content: string;
    file: File | null;
  }) => {
    console.log('저장할 데이터:', data);
    handleCloseModal();
  };

  useEffect(() => {
    reservationApi
      .getAll()
      .then(async (res) => {
        const reservationsWithDetails = await Promise.all(
          res.data.map(async (r: any) => {
            try {
              const accRes = await accommodationApi.getById(r.accommodationId);
              return { ...r, accommodation: accRes.data };
            } catch {
              return { ...r, accommodation: null };
            }
          }),
        );
        setReservations(reservationsWithDetails);
      })
      .catch(() => {});
  }, []);

  return (
    <VStack $css={styles.layout}>
      {/* 제목 */}
      <Text
        $css={{
          paddingInline: '$250',
          paddingBottom: '$250',
        }}
        style={styles.title}
      >
        나의 예약 내역
      </Text>

      {/* 예약 카드 목록 */}
      <VStack style={styles.cardList} $css={{ paddingInline: '$250' }}>
        {reservations.map((item: any) => {
          const accId = Number(
            item.accommodationId ?? item.accommodation?.id,
          );
          if (!Number.isFinite(accId)) return null;
          const accStyle = getAccommodationStyle(accId);
          const samchonName = item.accommodation?.name || '';

          return (
            <SamchonCard
              key={item.reservationId}
              imageUrl={accStyle.houseImage}
              bgColor={accStyle.bgColor}
              location={item.accommodation?.address?.address_short || ''}
              name={samchonName}
              cost={item.accommodation?.cost}
              hostInfo={item.accommodation?.accommodationHostInfo}
              tags={(item.accommodation?.options || [])
                .slice(0, 1)
                .map((opt: any) => ({
                  label: opt.name || opt,
                  color: accStyle.tagColor,
                }))}
              onClick={undefined}
              renderRightTop={
                <button
                  style={styles.guestbookBtn}
                  // 클릭 시 해당 삼춘 이름을 넘겨줌
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
                    handleOpenModal(samchonName);
                  }}
                >
                  방명록 쓰기
                </button>
              }
            >
              <HStack
                $css={{ gap: '$100', alignItems: 'center', marginTop: '6px' }}
              >
                <Image
                  src="/icons/calendar-icon.svg"
                  alt="날짜"
                  width={12}
                  height={13}
                />
                <Text style={styles.dateText}>
                  {item.startDate} - {item.endDate}
                </Text>
              </HStack>
            </SamchonCard>
          );
        })}

        <ActionButton label="예약 추가" onClick={() => router.push('/')} />
      </VStack>

      {/* 2. 방명록 작성을 위한 모달 추가 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <GuestbookModal
          onClose={handleCloseModal}
          onSubmit={handleSaveGuestbook}
        />
      </Modal>

      <BottomNavBar />
    </VStack>
  );
}

const styles = {
  // ... 기존 스타일 유지
  layout: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#fff',
    padding: '$250 0',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#2B343B',
    margin: 0,
    paddingTop: '10px',
  },
  cardList: {
    gap: '20px',
    paddingBottom: '120px',
  },
  guestbookBtn: {
    color: '#6DBFFF',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  dateText: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#989898',
  },
  // 모달 내부용 추가 스타일
  textarea: {
    width: '100%',
    height: '150px',
    borderRadius: '12px',
    border: '1px solid #E1E1E1',
    padding: '15px',
    fontSize: '14px',
    backgroundColor: '#F9F9F9',
    resize: 'none' as const,
    outline: 'none',
  },
  submitBtn: {
    width: '100%',
    height: '52px',
    backgroundColor: '#2B343B',
    color: '#fff',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
  },
} as const;
