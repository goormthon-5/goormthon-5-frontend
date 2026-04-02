import MapPage from '@/_pages/mapPage/MapPage';

export default function Page() {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  return <MapPage appKey={appKey} />;
}
