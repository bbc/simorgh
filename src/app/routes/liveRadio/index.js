import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import { liveRadioPath } from '#app/routes/utils/regex';
import { LiveRadioPage } from '#pages';
import getInitialData from './getInitialData';

export default {
  path: liveRadioPath,
  exact: true,
  component: LiveRadioPage,
  getInitialData,
  pageType: LIVE_RADIO_PAGE,
};
