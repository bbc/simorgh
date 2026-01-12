import { TopicIndexPage } from '#pages';
import { topicIndexPath } from '#app/routes/utils/regex';
import { TOPIC_INDEX_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: [topicIndexPath],
  exact: true,
  component: TopicIndexPage,
  getInitialData,
  pageType: TOPIC_INDEX_PAGE,
};
