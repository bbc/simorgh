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

export const buildUniquePromoId = ({
  sectionType,
  promoGroupId,
  promoItem,
  promoIndex = 0,
}) => {
  const assetUri = pathOr('', ['locators', 'assetUri'], promoItem);
  const canonicalUrl = pathOr('', ['locators', 'canonicalUrl'], promoItem);
  const uri = pathOr('', ['uri'], promoItem);
  const asset = assetUri || uri || canonicalUrl;
  const assetParts = asset.split(/www\.bbc\.(co\.uk|com)/);
  const assetId = assetParts[assetParts.length - 1].replace(/\W/g, '');
  const contentType = pathOr('', ['contentType'], promoItem);

  return [
    sectionType,
    'promo',
    promoGroupId,
    assetId,
    contentType,
    promoIndex + 1,
  ]
    .filter(Boolean)
    .join('-')
    .toLowerCase();
};
