'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';
import IcCalendar from '@/assets/icons/calendar-icon.svg';

export default function DateSearch() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 날짜 선택 핸들러
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  // 날짜 포맷팅 (yyyy. mm. dd)
  const displayDate = selectedDate
    ? selectedDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '언제 도착하시나요?';

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
      {/* 클릭 시 열기/닫기 토글 */}
      <div
        style={{ ...S.inputWrapper, cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={IcCalendar} alt="캘린더" width={19} height={19} />
        <div
          style={{
            ...S.inputPlaceholder,
            color: selectedDate ? '#333' : '#989898',
          }}
        >
          {displayDate}
        </div>
      </div>

      {/* 캘린더 팝업 */}
      {isOpen && (
        <>
          {/* 배경 클릭 시 닫기 위한 투명 오버레이 */}
          <div style={S.overlay} onClick={() => setIsOpen(false)} />

          <div style={S.calendarPopup}>
            <Calendar
              onChange={handleDateChange}
              calendarType="gregory"
              value={selectedDate || new Date()}
              locale="ko-KR"
              formatDay={(_, date) =>
                date.toLocaleString('en', { day: 'numeric' })
              }
              formatShortWeekday={(_, date) =>
                ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
              }
              formatMonthYear={(_, date) =>
                date.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                })
              }
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </>
      )}

      <style>{`
        .react-calendar { border: none !important; border-radius: 12px; font-family: inherit !important; }
        .react-calendar__month-view__weekdays abbr { text-decoration: none !important; font-weight: 600; color: #9CA3AF; }
        .react-calendar__tile--active { background: #6DBFFF !important; color: white !important; border-radius: 8px; }
        .react-calendar__tile--now { background: #f0f9ff !important; color: #6DBFFF !important; border-radius: 8px; }
        .react-calendar__navigation button { font-size: 16px; font-weight: 700; }
      `}</style>
    </div>
  );
}

const S = {
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '48px',
    padding: '0 14px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #E1E1E1',
    boxSizing: 'border-box' as const,
  },
  inputPlaceholder: {
    flex: 1,
    marginLeft: '8px',
    fontSize: '14.4px',
  },
  calendarPopup: {
    position: 'absolute' as const,
    top: '54px',
    left: 0,
    zIndex: 101,
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    paddingBottom: '10px',
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
};
