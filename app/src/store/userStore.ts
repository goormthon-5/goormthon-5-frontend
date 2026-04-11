import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: number;
  userName: string;
  setUser: (userId: number, userName: string) => void;
  clear: () => void;
}

// 로그인 기능 전 임시 기본값 (시드 데이터 기반)
const DEFAULT_USER_ID = 51;
const DEFAULT_USER_NAME = '제주좋아';

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: DEFAULT_USER_ID,
      userName: DEFAULT_USER_NAME,
      setUser: (userId, userName) => set({ userId, userName }),
      clear: () =>
        set({ userId: DEFAULT_USER_ID, userName: DEFAULT_USER_NAME }),
    }),
    {
      name: 'samchon-user',
    },
  ),
);
