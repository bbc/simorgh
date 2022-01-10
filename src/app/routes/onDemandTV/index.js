import { OnDemandTvPage } from '#pages';
import { onDemandTvPath } from '#utils/regex';
import { MEDIA_PAGE } from '#utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: onDemandTvPath,
  exact: true,
  component: OnDemandTvPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
