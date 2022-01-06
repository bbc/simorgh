import { OnDemandAudioPage } from '#pages';
import { podcastEpisodePath, podcastBrandPath } from '#utils/regex';
import { MEDIA_PAGE } from '#utils/pageTypes';
import getInitialData from '../onDemandAudio/getInitialData';

export default {
  path: [podcastEpisodePath, podcastBrandPath],
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
