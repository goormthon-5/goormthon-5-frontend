import instance from './axios/instance';

export const fileApi = {
  // 파일 업로드
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return instance.post('/api/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
