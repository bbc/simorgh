import { Article } from '#app/models/types/optimo';
import pathOr from 'ramda/src/pathOr';

export const advertisingAllowed = (pageType: string, article: Article) => {
  if (pageType === 'cpsAsset') {
    return pathOr(false, ['metadata', 'options', 'allowAdvertising'], article);
  }
  return pathOr(false, ['metadata', 'allowAdvertising'], article);
};

export const isSfv = (article: Article) => {
  return pathOr(false, ['metadata', 'consumableAsSFV'], article);
};
