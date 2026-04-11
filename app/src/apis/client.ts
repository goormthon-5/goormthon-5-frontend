import globalAxios, { AxiosResponse } from 'axios';
import {
  AccommodationControllerApi,
  ReservationControllerApi,
  GuestBookControllerApi,
  FavoriteControllerApi,
  HealthControllerApi,
  Configuration,
} from '@/generated/api';

// ===== Mock 데이터 =====
import accommodationsMock from '@/mocks/data/accommodations.json';
import accommodationsDetailMock from '@/mocks/data/accommodations-detail.json';
import guestBooksMock from '@/mocks/data/guest-books.json';
import reservationsMock from '@/mocks/data/reservations.json';

// ===== Mock / Real 스위치 =====
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

// ===== Real API 세팅 =====
const axiosInstance = globalAxios.create({ timeout: 10000 });
const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL || '',
});

const accommodationGen = new AccommodationControllerApi(
  configuration,
  undefined,
  axiosInstance,
);
const reservationGen = new ReservationControllerApi(
  configuration,
  undefined,
  axiosInstance,
);
const guestBookGen = new GuestBookControllerApi(
  configuration,
  undefined,
  axiosInstance,
);
const favoriteGen = new FavoriteControllerApi(
  configuration,
  undefined,
  axiosInstance,
);
const healthGen = new HealthControllerApi(
  configuration,
  undefined,
  axiosInstance,
);

// ===== 유틸 =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockOk = <T>(data: T): Promise<AxiosResponse<T, any>> =>
  Promise.resolve({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: {} as any,
  });

// ===== Mock 구현 (in-memory state) =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const detailMap = accommodationsDetailMock as Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const guestBooksMap = guestBooksMock as Record<string, any[]>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localReservations: any[] = [...(reservationsMock as any[])];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localGuestBooks: Record<string, any[]> = Object.fromEntries(
  Object.entries(guestBooksMap).map(([k, v]) => [k, [...v]]),
);

// ===== 도메인별 래퍼 =====
export const accommodationApi = {
  getAll: (params?: {
    areaGroup?: string[];
    startDate?: string;
    endDate?: string;
  }) => {
    if (USE_MOCK) return mockOk(accommodationsMock);
    return accommodationGen.list2(params);
  },

  getById: (id: number) => {
    if (USE_MOCK) {
      const data = detailMap[String(id)];
      if (!data) return Promise.reject(new Error(`Not found: ${id}`));
      return mockOk(data);
    }
    return accommodationGen.detail({ accommodationId: id });
  },

  search: (params: {
    keyword?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    if (USE_MOCK) {
      const q = (params.keyword || '').toLowerCase().trim();
      if (!q) return mockOk(accommodationsMock);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filtered = (accommodationsMock as any[]).filter((s: any) => {
        const name = s.name?.toLowerCase().includes(q);
        const short = (s.address?.address_short || '').toLowerCase().includes(q);
        const group = (s.address?.address_group || '').toLowerCase().includes(q);
        const tag = (s.options || []).some((opt: any) =>
          (opt.name || opt).toLowerCase().includes(q),
        );
        return name || short || group || tag;
      });
      return mockOk(filtered);
    }
    return accommodationGen.search(params);
  },

  aiRewrite: (id: number) => {
    if (USE_MOCK) {
      const data = detailMap[String(id)];
      return mockOk({ content: data?.description || '' });
    }
    return accommodationGen.aiRewrite({ accommodationId: id });
  },
};

export const reservationApi = {
  getAll: (userId?: number) => {
    if (USE_MOCK) {
      const filtered =
        userId != null
          ? localReservations.filter((r) => r.userId === userId)
          : localReservations;
      return mockOk(filtered);
    }
    return reservationGen.list({ userId });
  },

  create: (data: {
    accommodationId: number;
    userId: number;
    guestCount: number;
    startDate: string;
    endDate: string;
  }) => {
    if (USE_MOCK) {
      const newReservation = {
        reservationId: Date.now(),
        ...data,
        averageRating: 0,
        guestBookCount: 0,
      };
      localReservations.unshift(newReservation);
      return mockOk(newReservation);
    }
    return reservationGen.create({ createRequest: data });
  },
};

export const guestBookApi = {
  getByAccommodation: (accommodationId: number) => {
    if (USE_MOCK) {
      return mockOk(localGuestBooks[String(accommodationId)] || []);
    }
    return guestBookGen.list3({ accommodationId });
  },

  create: (
    accommodationId: number,
    request: { content: string; rating?: number },
    image?: File,
  ) => {
    if (USE_MOCK) {
      const key = String(accommodationId);
      const list = localGuestBooks[key] || (localGuestBooks[key] = []);
      const newEntry = {
        guestBookId: Date.now(),
        userId: 51,
        userName: '제주좋아',
        content: request.content,
        type: 'IMAGE',
        rating: request.rating ?? 0,
        imageUrl: image ? URL.createObjectURL(image) : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      list.unshift(newEntry);
      return mockOk(newEntry);
    }
    return guestBookGen.create2({
      accommodationId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: request as any,
      image,
    });
  },
};

// ===== Favorites (mock은 로컬 메모리) =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localFavorites: Array<{ userId: number; accommodationId: number; favoriteId: number }> = [];
let favoriteIdSeq = 1;

export const favoriteApi = {
  getByUser: (userId: number) => {
    if (USE_MOCK) {
      return mockOk(localFavorites.filter((f) => f.userId === userId));
    }
    return favoriteGen.list1({ userId });
  },

  getStatus: (userId: number, accommodationId: number) => {
    if (USE_MOCK) {
      const found = localFavorites.find(
        (f) => f.userId === userId && f.accommodationId === accommodationId,
      );
      return mockOk({
        isfavorited: !!found,
        favoriteId: found?.favoriteId ?? null,
      });
    }
    return favoriteGen.status({ userId, accommodationId });
  },

  add: (data: { userId: number; accommodationId: number }) => {
    if (USE_MOCK) {
      const fav = { ...data, favoriteId: favoriteIdSeq++ };
      localFavorites.push(fav);
      return mockOk(fav);
    }
    return favoriteGen.create1({ createRequest: data });
  },

  remove: (userId: number, accommodationId: number) => {
    if (USE_MOCK) {
      const idx = localFavorites.findIndex(
        (f) => f.userId === userId && f.accommodationId === accommodationId,
      );
      if (idx >= 0) localFavorites.splice(idx, 1);
      return mockOk({});
    }
    return favoriteGen._delete({ userId, accommodationId });
  },
};

export const healthApi = {
  check: () => {
    if (USE_MOCK) return mockOk({ status: 'ok' });
    return healthGen.health();
  },
};
