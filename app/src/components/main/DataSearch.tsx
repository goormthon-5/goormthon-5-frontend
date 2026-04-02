'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';
import { Box, HStack, Text } from '@vapor-ui/core';
import IcCalendar from '@/assets/icons/calendar-icon.svg';

export default function DataSearch() {
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
    <Box $css={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
      {/* 클릭 시 열기/닫기 토글 */}
      <HStack
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
        $css={{
          alignItems: 'center',
          width: '100%',
          height: '48px',
          paddingInline: '$175',
          paddingBlock: '$000',
          backgroundColor: '#ffffff',
          borderRadius: '$300',
          border: '1px solid #E1E1E1',
          boxSizing: 'border-box',
          gap: '$100',
        }}
      >
        <Image src={IcCalendar} alt="캘린더" width={19} height={19} />
        <Text
          style={{
            color: selectedDate ? '#333' : '#989898',
          }}
          $css={{
            flex: 1,
            minWidth: 0,
            fontSize: '14.4px',
          }}
        >
          {displayDate}
        </Text>
      </HStack>

      {/* 캘린더 팝업 */}
      {isOpen && (
        <>
          {/* 배경 클릭 시 닫기 위한 투명 오버레이 */}
          <Box
            onClick={() => setIsOpen(false)}
            $css={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1100,
              backgroundColor: 'transparent',
            }}
          />

          <Box
            style={{
              top: '54px',
              paddingBottom: '10px',
            }}
            $css={{
              position: 'absolute',
              left: 0,
              zIndex: 1101,
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
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
          </Box>
        </>
      )}

      <style>{`
        .react-calendar { border: none !important; border-radius: 12px; font-family: inherit !important; }
        .react-calendar__month-view__weekdays abbr { text-decoration: none !important; font-weight: 600; color: #9CA3AF; }
        .react-calendar__tile--active { background: #6DBFFF !important; color: white !important; border-radius: 8px; }
        .react-calendar__tile--now { background: #f0f9ff !important; color: #6DBFFF !important; border-radius: 8px; }
        .react-calendar__navigation button { font-size: 16px; font-weight: 700; }
      `}</style>
    </Box>
  );
}
