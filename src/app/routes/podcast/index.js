import { OnDemandAudioPage } from '#pages';
import { podcastEpisodePath, podcastBrandPath } from '#app/routes/utils/regex';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '../onDemandAudio/getInitialData';

export default {
  path: [podcastEpisodePath, podcastBrandPath],
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
