type Params = {
  ptrt?: string;
  userOrigin?: string;
  sequenceId?: string;
};

// eslint-disable-next-line import/prefer-default-export
export const appendCtaQueryParams = (
  url: string,
  { ptrt, userOrigin, sequenceId }: Params = {},
): string => {
  const ctaUrl = new URL(url);

  const ptrtQuery =
    ptrt ||
    (typeof window !== 'undefined' && window.location?.href
      ? window.location.href
      : '');

  if (ptrtQuery) ctaUrl.searchParams.set('ptrt', ptrtQuery);
  if (sequenceId) ctaUrl.searchParams.set('sequenceId', sequenceId);
  if (userOrigin) ctaUrl.searchParams.set('userOrigin', userOrigin);

  return ctaUrl.toString();
};
