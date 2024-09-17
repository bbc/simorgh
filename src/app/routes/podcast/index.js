import { OnDemandAudioPage } from '#pages';
import { podcastEpisodePath, podcastBrandPath } from '#routes/utils/regex';
import { MEDIA_PAGE } from '#routes/utils/pageTypes';
import getInitialData from '../onDemandAudio/getInitialData';

export default {
  path: [podcastEpisodePath, podcastBrandPath],
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
