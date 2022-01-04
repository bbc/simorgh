import { LiveRadioPage } from '#pages';
import { liveRadioPath } from '#utils/regex';
import getInitialData from './getInitialData';
import { MEDIA_PAGE } from '#utils/pageTypes';

export default {
  path: liveRadioPath,
  exact: true,
  component: LiveRadioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
