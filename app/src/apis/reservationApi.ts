import instance from './axios/instance';

interface CreateReservationRequest {
  accommodationId: number;
  userId: number;
  guestCount: number;
  startDate: string;
  endDate: string;
}

export const reservationApi = {
  // 예약 목록 조회
  getAll: () => instance.get('/api/reservations'),

  // 예약 생성
  create: (data: CreateReservationRequest) =>
    instance.post('/api/reservations', data),
};
