import { OnDemandRadioPage } from '#pages';
import { onDemandRadioPath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: onDemandRadioPath,
  exact: true,
  component: OnDemandRadioPage,
  getInitialData,
  pageType: 'onDemandRadio',
};
