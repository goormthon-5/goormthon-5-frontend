import Image from 'next/image';

interface GuestBookItemProps {
  imageUrl?: string | null;
  message: string;
}

export default function GuestBookItem({
  imageUrl,
  message,
}: GuestBookItemProps) {
  const displayImg =
    imageUrl && imageUrl.trim() !== '' ? imageUrl : '/images/default-img.png';

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
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#FBFBFB',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #F1F1F1',
  },
  imageWrapper: {
    position: 'relative' as const,
    width: '100%',
    aspectRatio: '1 / 1',
    backgroundColor: '#f5f5f5',
  },
  textWrapper: {
    padding: '14px 12px',
    textAlign: 'center' as const,
    minHeight: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '1.5',
    color: '#333',
    margin: 0,
    wordBreak: 'keep-all' as const,
  },
};
