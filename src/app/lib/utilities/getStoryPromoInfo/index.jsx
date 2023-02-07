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

export const getUrl = item => {
  const assetUri = pathOr('', ['locators', 'assetUri'], item);
  const canonicalUrl = pathOr('', ['locators', 'canonicalUrl'], item);
  const uri = pathOr('', ['uri'], item);

  return assetUri || canonicalUrl || makeRelativeUrlPath(uri);
};

export const getIsLive = item =>
  getAssetTypeCode(item) === null
    ? pathOr(false, ['cpsType'], item) === 'LIV'
    : false;
