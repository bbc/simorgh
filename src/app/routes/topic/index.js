import { TopicPage } from '#pages';
import { temporaryTopicPath, topicPath } from '#utils/regex';
import { TOPIC_PAGE } from '#utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: [temporaryTopicPath, topicPath],
  exact: true,
  component: TopicPage,
  getInitialData,
  pageType: TOPIC_PAGE,
};
