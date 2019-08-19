import { shape, object, oneOfType, number } from 'prop-types';
import { frontPageDataPropTypes } from '../frontPage';
import { articleDataPropTypes } from '../article';

export const pageDataPropType = oneOfType([
  articleDataPropTypes,
  frontPageDataPropTypes,
]);

export const dataPropType = shape({
  pageData: pageDataPropType.isRequired,
  status: number.isRequired,
  dials: object.isRequired,
});
