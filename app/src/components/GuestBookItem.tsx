import Image from 'next/image';

interface GuestBookItemProps {
  imageUrl?: string | null;
  message: string;
}

export default function GuestBookItem({
  imageUrl,
  message,
}: GuestBookItemProps) {
  // 기본 이미지
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
    width: '165px',
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
    width: '147px',
    height: '147px',
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
