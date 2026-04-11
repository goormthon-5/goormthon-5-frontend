import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clear: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),
      clear: () => set({ favorites: [] }),
    }),
    {
      name: 'samchon-favorites',
    },
  ),
);
