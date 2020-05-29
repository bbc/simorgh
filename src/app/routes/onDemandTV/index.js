import { OnDemandTvPage } from '#pages';
import { onDemandTvPath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: onDemandTvPath,
  exact: true,
  component: OnDemandTvPage,
  getInitialData,
  pageType: 'media',
};
