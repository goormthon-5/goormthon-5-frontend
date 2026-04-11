import type { Metadata } from 'next';
import MyPage from '@/_pages/myPage/MyPage';

export const metadata: Metadata = {
  title: '마이페이지 | 삼춘이랑',
  description: '내 정보와 설정을 관리하세요.',
};

export default function Page() {
  return <MyPage />;
}
