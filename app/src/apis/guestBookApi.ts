import { guestBookApi as client } from './client';

export const guestBookApi = {
  // 방명록 조회
  getByAccommodation: (accommodationId: number) =>
    client.getByAccommodation(accommodationId),

  // 방명록 작성
  create: (
    accommodationId: number,
    data: { content: string; rating?: number },
    image?: File,
  ) => client.create(accommodationId, data, image),
};
