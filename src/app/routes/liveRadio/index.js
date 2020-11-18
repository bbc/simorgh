import { LiveRadioPage } from '#pages';
import { liveRadioPath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: liveRadioPath,
  exact: true,
  component: LiveRadioPage,
  getInitialData,
  pageType: 'media',
};
