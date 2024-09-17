import { OnDemandAudioPage } from '#pages';
import { onDemandRadioPath } from '#routes/utils/regex';
import { MEDIA_PAGE } from '#routes/utils/pageTypes';
import getInitialData from '../onDemandAudio/getInitialData';

export default {
  path: onDemandRadioPath,
  exact: true,
  component: OnDemandAudioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
