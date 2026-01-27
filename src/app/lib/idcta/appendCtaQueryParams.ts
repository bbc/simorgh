type Params = {
  ptrt?: string;
  lang?: string;
};

export default (url: string, { ptrt, lang }: Params = {}): string => {
  const ctaUrl = new URL(url);

  if (ptrt) ctaUrl.searchParams.set('ptrt', ptrt);
  if (lang) ctaUrl.searchParams.set('lang', lang);

  return ctaUrl.toString();
};
