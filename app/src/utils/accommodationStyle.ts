const HOUSE_IMAGES = [
  '/images/house-1-new.svg',
  '/images/house-2-new.svg',
  '/images/house-3-new.svg',
];

// OG 공유용 PNG 이미지 (카톡/슬랙 미리보기는 SVG 미지원)
const OG_IMAGES = [
  '/images/meta-house-1-new.png',
  '/images/meta-house-2-new.png',
  '/images/meta-house-3-new.png',
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
    ogImage: OG_IMAGES[idx],
    bgColor: BG_COLORS[idx],
    markerIcon: MARKER_ICONS[idx],
    tagColor: TAG_COLORS[idx],
  };
}
