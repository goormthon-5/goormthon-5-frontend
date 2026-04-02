const HOUSE_IMAGES = [
  '/images/house-1-new.svg',
  '/images/house-2-new.svg',
  '/images/house-3-new.svg',
];

const BG_COLORS = ['#E0F4FF', '#FFECB3', '#D2FAE8'];

const MARKER_ICONS = [
  '/icons/vector2.svg',
  '/icons/vector1.svg',
  '/icons/vector3.svg',
];

const TAG_COLORS = [
  '#6DBFFF', // blue
  '#FFC061', // orange
  '#2B343B', // green
];

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
