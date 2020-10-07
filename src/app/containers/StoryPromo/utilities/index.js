import pathOr from 'ramda/src/pathOr';

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
  if (pageType === 'mostWatched') {
    return 'h2';
  }

  if (isRecommendation || isContentTypeGuide) {
    return 'div';
  }

  return null;
};

export const isPgl = item => pathOr(null, ['cpsType'], item) === 'PGL';
