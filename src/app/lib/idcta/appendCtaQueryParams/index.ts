type Params = {
  pageToReturnTo?: string | null;
  lang?: string | null;
  userOrigin?: string | null;
};

export default (
  url: string,
  { pageToReturnTo, lang, userOrigin }: Params = {},
): string => {
  const ctaUrl = new URL(url);

  if (pageToReturnTo) ctaUrl.searchParams.set('ptrt', pageToReturnTo);
  if (lang) ctaUrl.searchParams.set('lang', lang);

  ctaUrl.searchParams.set('skipAgeBracketScreen', 'true');
  if (userOrigin) ctaUrl.searchParams.set('userOrigin', userOrigin);
  ctaUrl.searchParams.set('context', 'international');

  return ctaUrl.toString();
};
