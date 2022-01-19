//imports route and combines them

import { TopicsPage } from '#pages';
import { topicsPath } from '#utils/regex';
import { TOPICS_PAGE } from '#utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: topicsPath,
  exact: true,
  component: TopicsPage,
  getInitialData,
  pageType: TOPICS_PAGE,
};
