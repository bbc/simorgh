import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import { topicPath } from '#app/routes/utils/regex';
import { TopicPage } from '#pages';
import getInitialData from './getInitialData';

export default {
  path: [topicPath],
  exact: true,
  component: TopicPage,
  getInitialData,
  pageType: TOPIC_PAGE,
};
