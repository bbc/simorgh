import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import { podcastBrandPath, podcastEpisodePath } from '#app/routes/utils/regex';
import { OnDemandAudioPage } from '#pages';
import getInitialData from '../onDemandAudio/getInitialData';

export default {
  path: [podcastEpisodePath, podcastBrandPath],
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: AUDIO_PAGE,
};
