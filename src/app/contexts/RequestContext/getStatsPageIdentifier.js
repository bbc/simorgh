const getStatsPageIdentifier = (service, pageType) => {
  if (pageType === 'article') {
    const optimoId = `c0000000000o`;
    return `${service}.articles.${optimoId}.page`;
  }
  if (pageType === 'frontpage') {
    return `${service}.page`; // front pages
  }
  return null;
};

export default getStatsPageIdentifier;
