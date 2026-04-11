import type { Metadata } from 'next';
import ReservationPage from '@/_pages/reservationPage/ReservationPage';

export const metadata: Metadata = {
  title: '나의 예약 내역 | 삼춘이랑',
  description: '예약한 삼춘네 목록을 확인하고 방명록을 남겨보세요.',
};

export default function Page() {
  return <ReservationPage />;
}
