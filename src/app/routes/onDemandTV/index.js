import { OnDemandTvPage } from '#pages';
import { onDemandTvPath } from '../utils/regex';
import getInitialData from './getInitialData';
import { MEDIA_PAGE } from '../utils/pageTypes';

export default {
  path: onDemandTvPath,
  exact: true,
  component: OnDemandTvPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
