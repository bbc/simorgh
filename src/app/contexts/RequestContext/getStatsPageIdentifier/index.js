import { ARTICLE_PAGE, FRONT_PAGE } from '../../../routes/utils/pageTypes';

const getStatsPageIdentifier = ({ pageType, service, id }) => {
  if (pageType === ARTICLE_PAGE) {
    return `${service}.articles.${id}.page`;
  }
  if (pageType === FRONT_PAGE) {
    return `${service}.page`; // front pages
  }
  return null;
};

export default getStatsPageIdentifier;
