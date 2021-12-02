import pathOr from 'ramda/src/pathOr';
import {
  MOST_WATCHED_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';

export const isMap = item => {
  const isCpsTypeMap = pathOr(null, ['cpsType'], item) === MEDIA_ASSET_PAGE;
  const hasMedia = pathOr(false, ['media'], item);

  return isCpsTypeMap || Boolean(hasMedia);
};

export const getHeadingTagOverride = ({ pageType, isContentTypeGuide }) => {
  if (pageType === MOST_WATCHED_PAGE) {
    return 'h2';
  }

  if (isContentTypeGuide) {
    return 'div';
  }

  return null;
};

export const isPgl = item => pathOr(null, ['cpsType'], item) === 'PGL';

export const getUniqueLinkId = (item, labelId) => {
  const assetUri = pathOr('', ['locators', 'assetUri'], item);
  const contentType = pathOr('', ['contentType'], item);
  const uri = pathOr('', ['uri'], item);
  const uniqueId = assetUri || uri;
  const assetId = uniqueId.split('/').pop();
  const sanitisedId = assetId.replace(/\W/g, '');
  return `promo-link-${labelId}${sanitisedId || ''}${contentType}`;
};
