import { accommodationApi as client } from './client';

export const accommodationApi = {
  // 숙소 목록 조회
  getAll: () => client.getAll(),

  // 숙소 상세 조회
  getById: (id: number) => client.getById(id),

  // 숙소 검색
  search: (query: string) => client.search({ keyword: query }),
};
