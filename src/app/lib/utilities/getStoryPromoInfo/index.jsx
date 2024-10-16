import pathOr from 'ramda/src/pathOr';
import makeRelativeUrlPath from '../makeRelativeUrlPath';

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

export const getUrl = (item, service = null, variant = null) => {
  const assetUri = pathOr(null, ['locators', 'assetUri'], item);
  const canonicalUrl = pathOr(null, ['locators', 'canonicalUrl'], item);
  let uri = pathOr(null, ['uri'], item);
  if (uri && service === 'zhongwen') {
    if (uri.indexOf(`/${variant}`) === -1 && uri.indexOf('/articles/') !== -1) {
      uri = uri.substr(0, uri.length - variant.length) + variant;
    }
  }

  return assetUri || makeRelativeUrlPath(uri) || canonicalUrl;
};

export const getIsLive = item =>
  getAssetTypeCode(item) === null
    ? pathOr(false, ['cpsType'], item) === 'LIV'
    : false;
