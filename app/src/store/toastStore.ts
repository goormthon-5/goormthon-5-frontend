import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
  show: (message: string, type?: ToastType) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => {
  let timer: NodeJS.Timeout | null = null;

  return {
    message: '',
    type: 'info',
    visible: false,
    show: (message, type = 'info') => {
      set({ message, type, visible: true });
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        set({ visible: false });
      }, 2500);
    },
    hide: () => {
      if (timer) clearTimeout(timer);
      set({ visible: false });
    },
  };
});

// 외부에서 쉽게 쓰는 헬퍼
export const toast = {
  success: (message: string) => useToastStore.getState().show(message, 'success'),
  error: (message: string) => useToastStore.getState().show(message, 'error'),
  info: (message: string) => useToastStore.getState().show(message, 'info'),
};
