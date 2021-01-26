import { RadioPodcastPage } from '#pages';
import { podcastPath, podcastBrandPath } from '#utils/regex';
import getInitialData from '../radioPodcast/getInitialData';
import { MEDIA_PAGE } from '#utils/pageTypes';

export default {
  path: [podcastPath, podcastBrandPath],
  exact: true,
  component: RadioPodcastPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
