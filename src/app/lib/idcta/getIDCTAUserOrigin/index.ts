import isLive from '#app/lib/utilities/isLive';

export const getIdctaUserOrigin = producerName => {
  if (!producerName) return null;
  const suffix = isLive() ? '' : '_TEST';
  return `WS_NEWS_${producerName}${suffix}`;
};

export default getIdctaUserOrigin;
