import { OnDemandAudioPage } from '#pages';
import { podcastEpisodePath, podcastBrandPath } from '#utils/regex';
import getInitialData from '../radioPodcast/getInitialData';
import { MEDIA_PAGE } from '#utils/pageTypes';

export default {
  path: [podcastEpisodePath, podcastBrandPath],
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
