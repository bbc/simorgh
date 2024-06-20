import pathOr from 'ramda/src/pathOr';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';

// MAP is now either a Media Asset Page or a Media Article Page
export const isMap = item => {
  const isCpsTypeMap = pathOr(null, ['cpsType'], item) === MEDIA_ASSET_PAGE;
  const hasMedia = pathOr(false, ['media'], item);
  const contentType = pathOr(null, ['contentType'], item);
  const isOptimoMediaPromo = ['Audio', 'Video'].includes(contentType);

  return isCpsTypeMap || Boolean(hasMedia) || isOptimoMediaPromo;
};

export const getHeadingTagOverride = ({ isContentTypeGuide }) => {
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
