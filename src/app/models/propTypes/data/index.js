import { shape, oneOfType, number } from 'prop-types';
import { frontPageDataPropTypes } from '../frontPage';
import { articleDataPropTypes } from '../article';
import { radioPageDataPropTypes } from '../radioPage';
import { cpsAssetPageDataPropTypes } from '../cpsAssetPage';

export const pageDataPropType = oneOfType([
  articleDataPropTypes,
  frontPageDataPropTypes,
  radioPageDataPropTypes,
  cpsAssetPageDataPropTypes,
]);

export const dataPropType = shape({
  pageData: pageDataPropType.isRequired,
  status: number.isRequired,
});
