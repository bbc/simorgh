import pathOr from 'ramda/src/pathOr';
import makeRelativeUrlPath from '../makeRelativeUrlPath';
import { variants } from '../variantHandler';

export const getAssetTypeCode = pathOr(null, ['assetTypeCode']);

export const getHeadline = item => {
  const overtypedHeadline = pathOr('', ['headlines', 'overtyped'], item);
  const headline =
    overtypedHeadline ||
    pathOr('', ['headlines', 'headline'], item) ||
    pathOr(
      '',
      [
        'headlines',
        'promoHeadline',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'text',
      ],
      item,
    ) ||
    pathOr('', ['name'], item);

  return headline;
};

export const getUrl = (item, variant = null) => {
  const assetUri = pathOr(null, ['locators', 'assetUri'], item);
  const canonicalUrl = pathOr(null, ['locators', 'canonicalUrl'], item);
  let uri = pathOr(null, ['uri'], item);
  if (uri && variant) {
    const hasVariantPath =
      uri.indexOf('/articles/') !== -1 ||
      uri.indexOf('/watch/') !== -1 ||
      uri.indexOf('/listen/') !== -1;
    if (hasVariantPath && uri.indexOf(`/${variant}`) === -1) {
      const hasKnownVariant = variants.some(knownVariant =>
        uri.endsWith(`/${knownVariant}`),
      );
      uri = hasKnownVariant
        ? uri.replace(/\/[^/]+$/, `/${variant}`)
        : `${uri}/${variant}`;
    }
  }

  return assetUri || makeRelativeUrlPath(uri) || canonicalUrl;
};

export const getIsLive = item =>
  getAssetTypeCode(item) === null
    ? pathOr(false, ['cpsType'], item) === 'LIV'
    : false;
