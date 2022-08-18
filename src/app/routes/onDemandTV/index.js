import { OnDemandTvPage } from '#pages';
import { onDemandTvPath } from '#app/routes/utils/regex';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: onDemandTvPath,
  exact: true,
  component: OnDemandTvPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
