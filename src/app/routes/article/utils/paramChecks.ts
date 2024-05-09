import pathOr from 'ramda/src/pathOr';

// TODO: Replace 'any' with the correct type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArticleType = any;

export const advertisingAllowed = (pageType: string, article: ArticleType) => {
  if (pageType === 'cpsAsset') {
    return pathOr(false, ['metadata', 'options', 'allowAdvertising'], article);
  }
  return pathOr(false, ['metadata', 'allowAdvertising'], article);
};

export const isSfv = (article: ArticleType) => {
  return pathOr(false, ['metadata', 'consumableAsSFV'], article);
};
