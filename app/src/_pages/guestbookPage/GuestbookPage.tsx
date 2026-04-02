'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, HStack, Text, VStack } from '@vapor-ui/core';
import GuestBookItem from '@/components/GuestBookItem';
import Spinner from '@/components/Spinner';
import { guestBookApi } from '@/apis/guestBookApi';
import { accommodationApi } from '@/apis/accommodationApi';
import IcBack from '@/assets/icons/back-icon.svg';

interface GuestbookPageProps {
  accommodationId: number;
}

export default function GuestbookPage({ accommodationId }: GuestbookPageProps) {
  const router = useRouter();
  const [guestbookList, setGuestbookList] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.allSettled([
      accommodationApi.getById(accommodationId),
      guestBookApi.getByAccommodation(accommodationId),
    ])
      .then((results) => {
        const acc = results[0];
        const gb = results[1];
        if (acc.status === 'fulfilled') setData(acc.value.data);
        if (gb.status === 'fulfilled') setGuestbookList(gb.value.data);
      })
      .finally(() => setIsLoading(false));
  }, [accommodationId]);

  return (
    <>
      <Spinner loading={isLoading} />

      {!isLoading && data && (
        <VStack
          style={{ margin: '0 auto', paddingBottom: '120px' }}
          $css={{
            width: '100%',
            maxWidth: '390px',
            minHeight: '100vh',
            backgroundColor: '#fff',
            position: 'relative',
          }}
        >
          <header style={{ padding: '16px 20px' }}>
            <button
              type="button"
              onClick={() => router.back()}
              style={styles.backButton}
            >
              <Image src={IcBack} alt="뒤로가기" width={24} height={24} />
            </button>
          </header>

          <VStack
            style={{ marginBottom: '40px' }}
            $css={{ alignItems: 'center', width: '100%' }}
          >
            <Box
              style={{
                position: 'relative',
                width: '140px',
                height: '140px',
                marginBottom: '16px',
                borderRadius: '50%',
                backgroundColor: '#E6F4FF',
                overflow: 'hidden',
              }}
            >
              <Image
                src={data.imageUrl || '/images/house-2.png'}
                alt="숙소 프로필"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Text
              render={<h1 />}
              style={{ margin: 0 }}
              $css={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#121212',
              }}
            >
              {data.name}
            </Text>
          </VStack>

          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              padding: '0 20px',
            }}
          >
            {guestbookList.map((item, index) => (
              <GuestBookItem
                key={
                  item.guestBookId ??
                  item.id ??
                  `guestbook-${accommodationId}-${index}`
                }
                imageUrl={item.imageUrl}
                message={item.content || item.message}
              />
            ))}
          </Box>
        </VStack>
      )}
    </>
  );
}

const styles = {
  backButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
} as const;
