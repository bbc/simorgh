import { TV_PAGE } from '#app/routes/utils/pageTypes';
import { onDemandTvPath } from '#app/routes/utils/regex';
import { OnDemandTvPage } from '#pages';
import getInitialData from './getInitialData';

export default {
  path: onDemandTvPath,
  exact: true,
  component: OnDemandTvPage,
  getInitialData,
  pageType: TV_PAGE,
};
