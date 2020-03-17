import { OnDemandRadioPage } from '#pages';
import { radioAndTvPath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: radioAndTvPath,
  exact: true,
  component: OnDemandRadioPage,
  getInitialData,
  pageType: 'media',
};
