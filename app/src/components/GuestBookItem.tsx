import Image from 'next/image';
import { Box, Text, VStack } from '@vapor-ui/core';
import guestBook1 from '@/assets/images/guest-book-1.png';
import guestBook2 from '@/assets/images/guest-book-2.png';
import guestBook3 from '@/assets/images/guest-book-3.png';
import guestBook4 from '@/assets/images/guest-book-4.png';
import guestBook5 from '@/assets/images/guest-book-5.png';

const DEFAULT_IMAGES = [guestBook1, guestBook2, guestBook3, guestBook4, guestBook5];

interface GuestBookItemProps {
  imageUrl?: string | null;
  message: string;
  index?: number;
}

export default function GuestBookItem({
  imageUrl,
  message,
  index = 0,
}: GuestBookItemProps) {
  const displayImg =
    imageUrl && imageUrl.trim() !== ''
      ? imageUrl
      : DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];

  return (
    <VStack
      style={{ width: '165px' }}
      $css={{
        backgroundColor: '#FBFBFB',
        borderRadius: '$300',
        overflow: 'hidden',
        alignItems: 'center',
        paddingTop: '9px',
        paddingBottom: '$150',
        boxSizing: 'border-box',
        border: '1px solid #F1F1F1',
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '147px',
          height: '147px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={displayImg}
          alt="방명록 사진"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <VStack
        style={{ padding: '10px 9px 0 9px' }}
        $css={{
          width: '100%',
          boxSizing: 'border-box',
          alignItems: 'center',
        }}
      >
        <Text
          style={{ margin: 0 }}
          $css={{
            fontFamily: '"BM HANNA 11yrs old", "BMHANNA11yrsold", sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            lineHeight: '1.4',
            color: '#262626',
            wordBreak: 'keep-all',
            whiteSpace: 'pre-line',
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
      </VStack>
    </VStack>
  );
}
