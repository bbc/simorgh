import { RadioPage } from '#pages';
import { liveRadioPath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: liveRadioPath,
  exact: true,
  component: RadioPage,
  getInitialData,
  pageType: 'media',
};
