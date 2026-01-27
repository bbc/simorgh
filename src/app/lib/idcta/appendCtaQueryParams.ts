type Params = {
  pageToReturnTo?: string | null;
  lang?: string | null;
};

export default (url: string, { pageToReturnTo, lang }: Params = {}): string => {
  const ctaUrl = new URL(url);

  if (pageToReturnTo) ctaUrl.searchParams.set('ptrt', pageToReturnTo);
  if (lang) ctaUrl.searchParams.set('lang', lang);

  return ctaUrl.toString();
};
