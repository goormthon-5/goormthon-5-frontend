'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GuestBookItem from '@/components/GuestBookItem';
import { guestBookApi } from '@/apis/guestBookApi';
import { accommodationApi } from '@/apis/accommodationApi';
import IcBack from '@/assets/icons/back-icon.svg';
import { getAccommodationStyle } from '@/utils/accommodationStyle';

interface GuestbookPageProps {
  accommodationId: number;
}

export default function GuestbookPage({ accommodationId }: GuestbookPageProps) {
  const router = useRouter();
  const [guestbookList, setGuestbookList] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);
  const accStyle = getAccommodationStyle(accommodationId);

  useEffect(() => {
    // 1. 숙소 상세 데이터 호출
    accommodationApi.getById(accommodationId).then((res) => {
      setData(res.data);
    });

    // 2. 방명록 리스트 호출
    guestBookApi.getByAccommodation(accommodationId).then((res) => {
      setGuestbookList(res.data);
    });
  }, [accommodationId]);

  if (!data) return null;

  return (
    <div style={S.container}>
      {/* 상단 헤더 */}
      <header style={S.header}>
        <button onClick={() => router.back()} style={S.backButton}>
          <Image src={IcBack} alt="뒤로가기" width={24} height={24} />
        </button>
      </header>

      {/* 상단 프로필 */}
      <div style={S.profileSection}>
        <div style={{ ...S.avatarWrapper, backgroundColor: accStyle.bgColor }}>
          <Image
            src={accStyle.houseImage}
            alt="숙소 프로필"
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h1 style={S.profileName}>{data.name}</h1>
      </div>

      {/* 2열 그리드 리스트 */}
      <div style={S.gridContainer}>
        {guestbookList.map((item, index) => (
          <GuestBookItem
            key={
              item.guestBookId ??
              item.id ??
              `guestbook-${accommodationId}-${index}`
            }
            imageUrl={item.imageUrl}
            message={item.content || item.message}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

const S = {
  container: {
    width: '100%',
    maxWidth: '390px',
    margin: '0 auto',
    backgroundColor: '#fff',
    minHeight: '100vh',
    paddingBottom: '120px',
    position: 'relative' as const,
  },
  header: { padding: '16px 20px' },
  backButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginBottom: '40px',
  },
  avatarWrapper: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    backgroundColor: '#E6F4FF',
    marginBottom: '16px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#121212',
    margin: 0,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '0 20px',
  },
};
