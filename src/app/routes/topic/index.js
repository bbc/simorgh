import { TopicPage } from '#pages';
import { topicPath } from '#app/routes/utils/regex';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: [topicPath, '/persian/afghanistan'],
  exact: true,
  component: TopicPage,
  getInitialData,
  pageType: TOPIC_PAGE,
};
