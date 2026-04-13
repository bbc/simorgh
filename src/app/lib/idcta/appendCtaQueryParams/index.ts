type Params = {
  pageToReturnTo?: string | null;
  lang?: string | null;
  env?: string | null;
};

export default (
  url: string,
  { pageToReturnTo, lang, env }: Params = {},
): string => {
  const ctaUrl = new URL(url);

  if (pageToReturnTo) ctaUrl.searchParams.set('ptrt', pageToReturnTo);
  if (lang) ctaUrl.searchParams.set('lang', lang);

  ctaUrl.searchParams.set('skipAgeBracketScreen', 'true');
  ctaUrl.searchParams.set(
    'userOrigin',
    env === 'live' ? 'WS_NEWS_HINDI' : 'WS_NEWS_HINDI_TEST',
  );
  ctaUrl.searchParams.set('context', 'international');

  return ctaUrl.toString();
};
