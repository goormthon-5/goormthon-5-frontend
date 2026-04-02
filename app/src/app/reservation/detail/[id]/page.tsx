import DetailPage from '@/_pages/detailPage/DetailPage';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  return (
    <DetailPage id={Number.isFinite(numId) ? numId : 1} />
  );
}
