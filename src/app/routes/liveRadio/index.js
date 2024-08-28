import { LiveRadioPage } from '#pages';
import { liveRadioPath } from '#routes/utils/regex';
import { MEDIA_PAGE } from '#routes/utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: liveRadioPath,
  exact: true,
  component: LiveRadioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
