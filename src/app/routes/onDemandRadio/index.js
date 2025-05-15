import { OnDemandAudioPage } from '#pages';
import { onDemandRadioPath } from '#app/routes/utils/regex';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '../onDemandAudio/getInitialData';

export default {
  path: onDemandRadioPath,
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: AUDIO_PAGE,
};
