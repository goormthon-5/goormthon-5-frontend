import { reservationApi as client } from './client';

interface CreateReservationRequest {
  accommodationId: number;
  userId: number;
  guestCount: number;
  startDate: string;
  endDate: string;
}

export const reservationApi = {
  // 예약 목록 조회
  getAll: () => client.getAll(),

  // 예약 생성
  create: (data: CreateReservationRequest) => client.create(data),
};
