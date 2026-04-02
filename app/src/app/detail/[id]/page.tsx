'use client';

import { useParams } from 'next/navigation';
import DetailPage from '@/_pages/detailPage/DetailPage';

export default function Page() {
  const params = useParams();
  const id = Number(params.id);

  return <DetailPage id={id} />;
}
