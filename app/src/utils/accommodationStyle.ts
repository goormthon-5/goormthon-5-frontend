const HOUSE_IMAGES = [
  '/images/house-1-new.svg',
  '/images/house-2-new.svg',
  '/images/house-3-new.svg',
];

const BG_COLORS = ['#E0F4FF', '#FFC061', '#D2FAE8'];

const MARKER_ICONS = [
  '/icons/vector2.svg',  // 하늘색 #6DBFFF
  '/icons/vector1.svg',  // 주황색 #FFC061
  '/icons/vector3.svg',  // 검정색 #2B343B
];

const TAG_COLORS = ['#6DBFFF', '#FFB632', '#00E284'];

/**
 * 숙소 ID 기반으로 일관된 스타일을 반환합니다.
 * 같은 ID는 항상 같은 스타일을 반환합니다.
 */
export function getAccommodationStyle(accommodationId: number) {
  const idx = accommodationId % HOUSE_IMAGES.length;

  return {
    houseImage: HOUSE_IMAGES[idx],
    bgColor: BG_COLORS[idx],
    markerIcon: MARKER_ICONS[idx],
    tagColor: TAG_COLORS[idx],
  };
}
