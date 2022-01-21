import { TopicPage } from '#pages';
import { topicPath } from '#utils/regex';
import getInitialData from './getInitialData';

export default {
  path: topicPath,
  exact: true,
  component: TopicPage,
  getInitialData,
  pageType: 'TOPIC_PAGE',
};
