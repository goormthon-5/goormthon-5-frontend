import Image from 'next/image';
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
    <div style={S.card}>
      <div style={S.imageWrapper}>
        <Image
          src={displayImg}
          alt="방명록 사진"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div style={S.textWrapper}>
        <p style={S.message}>{message}</p>
      </div>
    </div>
  );
}

const S = {
  card: {
    width: '100%',
    backgroundColor: '#FBFBFB',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    paddingTop: '9px',
    paddingBottom: '12px',
    boxSizing: 'border-box' as const,
    border: '1px solid #F1F1F1',
  },
  imageWrapper: {
    position: 'relative' as const,
    width: 'calc(100% - 18px)',
    aspectRatio: '1',
    overflow: 'hidden',
  },
  textWrapper: {
    width: '100%',
    padding: '10px 9px 0 9px',
    boxSizing: 'border-box' as const,
    textAlign: 'center' as const,
  },
  message: {
    fontFamily: '"BM HANNA 11yrs old", "BMHANNA11yrsold", sans-serif',
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '1.4',
    color: '#262626',
    margin: 0,
    wordBreak: 'keep-all' as const,
    whiteSpace: 'pre-line' as const,
  },
};
