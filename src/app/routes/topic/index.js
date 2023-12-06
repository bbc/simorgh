import { TopicPage } from '#pages';
import { topicPath } from '#app/routes/utils/regex';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import isLive from '#app/lib/utilities/isLive';
import getInitialData from './getInitialData';

const path = [topicPath];

if (!isLive()) {
  path.push('/persian/afghanistan');
}

export default {
  path,
  exact: true,
  component: TopicPage,
  getInitialData,
  pageType: TOPIC_PAGE,
};
