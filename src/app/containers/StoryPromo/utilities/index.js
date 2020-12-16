import pathOr from 'ramda/src/pathOr';
import { MOST_WATCHED_PAGE } from '#app/routes/utils/pageTypes';

export const isMap = item => {
  const isCpsTypeMap = pathOr(null, ['cpsType'], item) === 'MAP';
  const hasMedia = pathOr(false, ['media'], item);

  return isCpsTypeMap || Boolean(hasMedia);
};

export const getHeadingTagOverride = ({
  pageType,
  isRecommendation,
  isContentTypeGuide,
}) => {
  if (pageType === MOST_WATCHED_PAGE) {
    return 'h2';
  }

  if (isRecommendation || isContentTypeGuide) {
    return 'div';
  }

  return null;
};

export const isPgl = item => pathOr(null, ['cpsType'], item) === 'PGL';
