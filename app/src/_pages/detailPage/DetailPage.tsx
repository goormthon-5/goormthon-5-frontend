'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HouseCard from '@/components/HouseCard';
import CategoryTag, { TAG_COLORS } from '@/components/CategoryTag';
import RatingBadge from '@/components/RatingBadge';
import ActionButton from '@/components/ActionButton';
import samchons from '@/mocks/samchons.json';

const DUMMY = samchons[0];

export default function DetailPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<string[]>(DUMMY.messages);
  const [newMessage, setNewMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage('');
      setShowInput(false);
    }
  };

  return (
    <div style={styles.layout}>
      {/* 상단 이미지 영역 */}
      <div style={styles.imageSection}>
        <div style={styles.backButtonWrap}>
          <button
            type="button"
            style={styles.backButton}
            onClick={() => router.back()}
          >
            <Image
              src="/icons/arrow.svg"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </button>
        </div>
        <HouseCard
          imageUrl={DUMMY.imageUrl}
          bgColor="#E0F4FF"
          size="detail"
        />
      </div>

      {/* 정보 영역 */}
      <div style={styles.contentSection}>
        {/* 위치 + 이름 + 별점 */}
        <div style={styles.infoBlock}>
          <span style={styles.location}>{DUMMY.location}</span>
          <h1 style={styles.name}>{DUMMY.name}</h1>
          <RatingBadge
            rating={DUMMY.rating}
            reviewCount={DUMMY.reviewCount}
          />
        </div>

        {/* 소개 */}
        <div style={styles.infoBlock}>
          <h2 style={styles.sectionTitle}>소개</h2>
          <p style={styles.description}>{DUMMY.description}</p>
        </div>

        <div style={styles.divider} />

        {/* 함께하는 것들 */}
        <div style={styles.infoBlock}>
          <h2 style={styles.sectionTitle}>함께하는 것들</h2>
          <div style={styles.tagRow}>
            {DUMMY.tags.map((tag) => (
              <CategoryTag
                key={tag.label}
                label={tag.label}
                color={TAG_COLORS[tag.color as keyof typeof TAG_COLORS]}
              />
            ))}
          </div>
        </div>

        <div style={styles.divider} />

        {/* 여행객들의 메세지 */}
        <div style={styles.infoBlock}>
          <h2 style={styles.sectionTitle}>여행객들의 메세지</h2>
          <div style={styles.messageList}>
            {messages.map((msg, idx) => (
              <div key={idx} style={styles.messageCard}>
                <span style={styles.messageText}>{msg}</span>
              </div>
            ))}
            {showInput && (
              <div style={styles.messageCard}>
                <input
                  style={styles.messageInput}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                  placeholder="메세지를 입력하세요"
                  autoFocus
                />
              </div>
            )}
            <ActionButton
              label="메세지 추가"
              onClick={() =>
                showInput ? handleAddMessage() : setShowInput(true)
              }
            />
          </div>
        </div>
      </div>

      {/* 하단 예약하기 */}
      <div style={styles.bottomBar}>
        <div
          style={styles.reserveBar}
          onClick={() => router.push('/reservation-complete')}
        >
          <span style={styles.reserveText}>예약하기</span>
        </div>
        <div style={styles.homeBar}>
          <div style={styles.homeIndicator} />
        </div>
      </div>
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
  // 상단 이미지
  imageSection: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '390px',
    height: '325px',
    backgroundColor: '#E0F4FF',
    overflow: 'hidden',
  },
  backButtonWrap: {
    position: 'absolute' as const,
    top: '20px',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    zIndex: 10,
    overflow: 'hidden',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  // 컨텐츠
  contentSection: {
    display: 'flex',
    width: '350px',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: '30px',
    padding: '22px 20px',
    alignSelf: 'center',
    paddingBottom: '120px',
  },
  infoBlock: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: '4px',
  },
  location: {
    color: '#A1A1A1',
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '14.4px',
    fontWeight: 500,
    lineHeight: '21.6px',
  },
  name: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '21.6px',
    fontWeight: 700,
    lineHeight: '31.2px',
    letterSpacing: '-0.12px',
    color: '#262626',
    margin: 0,
  },
  sectionTitle: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: '14.4px',
    fontWeight: 500,
    lineHeight: '21.6px',
    color: '#262626',
    margin: 0,
  },
  description: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
    margin: 0,
    width: '100%',
    wordBreak: 'keep-all' as const,
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#E1E1E1',
  },
  tagRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginTop: '9px',
  },
  // 메세지
  messageList: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column' as const,
    gap: '10px',
    marginTop: '6px',
  },
  messageCard: {
    display: 'flex',
    height: '48px',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: '0 17px',
    borderRadius: '8px',
    border: '1px solid #E1E1E1',
    backgroundColor: '#FBFBFB',
    overflow: 'hidden',
  },
  messageInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
  },
  messageText: {
    fontFamily:
      'var(--vapor-typography-fontFamily-sans, Pretendard, sans-serif)',
    fontSize: 'var(--vapor-typography-fontSize-075, 14px)',
    fontWeight: 400,
    lineHeight: 'var(--vapor-typography-lineHeight-075, 22px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#5D5D5D',
  },
  // 하단 예약하기
  bottomBar: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    maxWidth: '390px',
  },
  reserveBar: {
    width: '100%',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B343B',
    overflow: 'hidden',
  },
  reserveText: {
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center' as const,
    lineHeight: '100%',
  },
  homeBar: {
    width: '100%',
    height: '34px',
    backgroundColor: '#2B343B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: '8px',
  },
  homeIndicator: {
    width: '134px',
    height: '5px',
    borderRadius: '100px',
    backgroundColor: '#fff',
  },
} as const;
