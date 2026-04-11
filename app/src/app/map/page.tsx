import type { Metadata } from 'next';
import MapPage from '@/_pages/mapPage/MapPage';

export const metadata: Metadata = {
  title: '지도 | 삼춘이랑',
  description: '제주 전역의 삼춘네를 지도에서 찾아보세요.',
};

export default function Page() {
  return <MapPage />;
}
