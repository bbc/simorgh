import pathOr from 'ramda/src/pathOr';

export const getAssetTypeCode = pathOr(null, ['assetTypeCode']);

export const getHeadlineUrlAndLive = (item, isAssetTypeCode) => {
  let headline;
  let url;
  let isLive;

  if (isAssetTypeCode !== null) {
    headline = pathOr(null, ['name'], item);
    url = pathOr(null, ['uri'], item);
  } else {
    headline = pathOr(null, ['headlines', 'headline'], item);
    url = pathOr(null, ['locators', 'assetUri'], item);
    isLive = pathOr(null, ['cpsType'], item) === 'LIV';
  }
  return {
    headline,
    url,
    isLive,
  };
};
