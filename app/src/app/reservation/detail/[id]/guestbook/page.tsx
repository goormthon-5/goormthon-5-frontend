'use client';

import { useParams } from 'next/navigation';
import GuestbookPage from '@/_pages/guestbookPage/GuestbookPage';

export default function Page() {
  const params = useParams();
  const id = Number(params.id);

  return <GuestbookPage accommodationId={id} />;
}
