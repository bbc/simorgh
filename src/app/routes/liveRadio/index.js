import { LiveRadioPage } from '#pages';
import { liveRadioPath } from '#utils/regex';
import { MEDIA_PAGE } from '#utils/pageTypes';
import getInitialData from './getInitialData';

export default {
  path: liveRadioPath,
  exact: true,
  component: LiveRadioPage,
  getInitialData,
  pageType: MEDIA_PAGE,
};
