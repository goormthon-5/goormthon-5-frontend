import instance from './axios/instance';

export const guestBookApi = {
  // 방명록 조회
  getByAccommodation: (accommodationId: number) =>
    instance.get(`/api/accommodations/${accommodationId}/guest-books`),

  // 방명록 작성 (multipart/form-data)
  create: (
    accommodationId: number,
    data: { content: string; rating?: number; image?: File | null },
  ) => {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.rating != null) formData.append('rating', String(data.rating));
    if (data.image) formData.append('image', data.image);
    return instance.post(
      `/api/accommodations/${accommodationId}/guest-books`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
  },
};
