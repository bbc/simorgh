import { RadioPodcastPage } from '#pages';
import { podcastPath } from '#utils/regex';
import getInitialData from './getInitialData';
import { MEDIA_PAGE } from '#utils/pageTypes';

export default {
  path: podcastPath,
  exact: true,
  component: RadioPodcastPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
