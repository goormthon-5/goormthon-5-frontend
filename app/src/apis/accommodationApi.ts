import instance from './axios/instance';

export const accommodationApi = {
  // 숙소 목록 조회
  getAll: () => instance.get('/api/accommodations'),

  // 숙소 상세 조회
  getById: (id: number) => instance.get(`/api/accommodations/${id}`),

  // 숙소 검색
  search: (query: string) =>
    instance.get('/api/accommodations/search', { params: { query } }),
};
