export const getIdctaUserOrigin = (producerName, env) => {
  if (!producerName) return null;
  const suffix = env === 'live' ? '' : '_TEST';
  return `WS_NEWS_${producerName}${suffix}`;
};

export default getIdctaUserOrigin;
