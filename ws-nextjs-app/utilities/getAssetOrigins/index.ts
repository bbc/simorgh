const ANALYTICS_ORIGINS = ['https://ping.chartbeat.net'];

const inferOrigin = (url?: string) => {
  if (!url) return null;

  return new URL(url).origin;
};

const isAmpOrLite = (urlPath: string) =>
  ['.amp', '.lite'].some(pageType => urlPath.includes(pageType));

const getAssetOrigins = (requestPath: string) => {
  const dnsPrefetchOrigins = [
    process.env.SIMORGH_ATI_BASE_URL,
    ...ANALYTICS_ORIGINS,
    ...(!isAmpOrLite(requestPath)
      ? [inferOrigin(process.env.SIMORGH_REVERB_SOURCE)]
      : []),
  ];

  const preconnectOrigins = [
    process.env.SIMORGH_ICHEF_BASE_URL,
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  ];

  return { dnsPrefetchOrigins, preconnectOrigins };
};

export default getAssetOrigins;
