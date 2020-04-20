import { shape, oneOfType, number } from 'prop-types';
import { frontPageDataPropTypes } from '../frontPage';
import { articleDataPropTypes } from '../article';
import { liveRadioPageDataPropTypes } from '../liveRadioPage';
import { cpsAssetPageDataPropTypes } from '../cpsAssetPage';
import { onDemandRadioPageDataPropTypes } from '../onDemandRadioPage';

export const pageDataPropType = oneOfType([
  articleDataPropTypes,
  frontPageDataPropTypes,
  liveRadioPageDataPropTypes,
  cpsAssetPageDataPropTypes,
  onDemandRadioPageDataPropTypes,
]);

export const dataPropType = shape({
  pageData: pageDataPropType.isRequired,
  status: number.isRequired,
});
