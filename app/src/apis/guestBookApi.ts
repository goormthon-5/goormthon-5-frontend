import instance from './axios/instance';

export const guestBookApi = {
  // 방명록 조회
  getByAccommodation: (accommodationId: number) =>
    instance.get(`/api/accommodations/${accommodationId}/guest-books`),

  // 방명록 작성
  create: (accommodationId: number, data: { content: string }) =>
    instance.post(`/api/accommodations/${accommodationId}/guest-books`, data),
};
