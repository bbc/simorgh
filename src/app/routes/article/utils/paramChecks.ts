import pathOr from 'ramda/src/pathOr';
import { InferProps } from 'prop-types';
import { articleDataPropTypes } from '../../../models/propTypes/article';

export type ArticleType = InferProps<typeof articleDataPropTypes>;

export const advertisingAllowed = (pageType: string, article: ArticleType) => {
  if (pageType === 'cpsAsset') {
    return pathOr(false, ['metadata', 'options', 'allowAdvertising'], article);
  }
  return pathOr(false, ['metadata', 'allowAdvertising'], article);
};

export const isSfv = (article: ArticleType) => {
  return pathOr(false, ['metadata', 'consumableAsSFV'], article);
};
