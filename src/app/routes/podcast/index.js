import { OnDemandAudioPage } from '#pages';
import { podcastEpisodePath, podcastBrandPath } from '#app/routes/utils/regex';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '../onDemandAudio/getInitialData';

export default {
  path: [podcastEpisodePath, podcastBrandPath],
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: AUDIO_PAGE,
};
