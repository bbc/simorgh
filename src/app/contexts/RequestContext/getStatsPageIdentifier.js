const getStatsPageIdentifier = ({ pageType, service, id }) => {
  if (pageType === 'article') {
    return `${service}.articles.${id}.page`;
  }
  if (pageType === 'frontpage') {
    return `${service}.page`; // front pages
  }
  return null;
};

export default getStatsPageIdentifier;
