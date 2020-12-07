import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

const getStatsPageIdentifier = ({ pageType, service, id }) => {
  if (pageType === ARTICLE_PAGE) {
    return `${service}.articles.${id}.page`;
  }
  if (pageType === 'frontPage') {
    return `${service}.page`; // front pages
  }
  return null;
};

export default getStatsPageIdentifier;
