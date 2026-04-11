// 숙소 관련 라벨 매핑 (한 곳에서 관리)

export const CLEANLINESS_LABEL: Record<string, string> = {
  LV1: '청결 C',
  LV2: '청결 B',
  LV3: '청결 A',
};

/**
 * 청결도 레벨 코드를 라벨로 변환
 * @example getCleanlinessLabel('LV1') // '청결 C'
 */
export const getCleanlinessLabel = (level?: string | null): string => {
  if (!level) return '';
  return CLEANLINESS_LABEL[level] || level;
};
