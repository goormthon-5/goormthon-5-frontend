import globalAxios from 'axios';
import {
  AccommodationControllerApi,
  ReservationControllerApi,
  GuestBookControllerApi,
  FavoriteControllerApi,
  HealthControllerApi,
  Configuration,
} from '@/generated/api';

// 공용 axios 인스턴스 (interceptor 등 확장 지점)
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

// 도메인별 래퍼 — 컴포넌트는 이 이름으로만 사용
export const accommodationApi = {
  getAll: (params?: {
    areaGroup?: string[];
    startDate?: string;
    endDate?: string;
  }) => accommodationGen.list2(params),
  getById: (id: number) => accommodationGen.detail({ accommodationId: id }),
  search: (params: {
    keyword?: string;
    startDate?: string;
    endDate?: string;
  }) => accommodationGen.search(params),
  aiRewrite: (id: number) =>
    accommodationGen.aiRewrite({ accommodationId: id }),
};

export const reservationApi = {
  getAll: (userId?: number) => reservationGen.list({ userId }),
  create: (data: {
    accommodationId: number;
    userId: number;
    guestCount: number;
    startDate: string;
    endDate: string;
  }) => reservationGen.create({ createRequest: data }),
};

export const guestBookApi = {
  getByAccommodation: (accommodationId: number) =>
    guestBookGen.list3({ accommodationId }),
  create: (
    accommodationId: number,
    request: { content: string; rating?: number },
    image?: File,
  ) =>
    guestBookGen.create2({
      accommodationId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: request as any,
      image,
    }),
};

export const favoriteApi = {
  getByUser: (userId: number) => favoriteGen.list1({ userId }),
  getStatus: (userId: number, accommodationId: number) =>
    favoriteGen.status({ userId, accommodationId }),
  add: (data: { userId: number; accommodationId: number }) =>
    favoriteGen.create1({ createRequest: data }),
  remove: (userId: number, accommodationId: number) =>
    favoriteGen._delete({ userId, accommodationId }),
};

export const healthApi = {
  check: () => healthGen.health(),
};
