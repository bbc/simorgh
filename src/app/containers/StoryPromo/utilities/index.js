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

export const buildUniquePromoId = (item, labelId) => {
  const id = pathOr('', ['id'], item);
  const assetUri = pathOr('', ['locators', 'assetUri'], item);
  const uri = pathOr('', ['uri'], item);
  const assetId = (id || assetUri || uri).replace(/\W/g, '').split('/').pop();
  const contentType = pathOr('', ['contentType'], item);

  return ['promo', labelId, assetId, contentType]
    .filter(Boolean)
    .join('-')
    .toLowerCase();
};
