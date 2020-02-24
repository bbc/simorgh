import RadioPage from '#pages/RadioPage';
import getInitialData from './getInitialData';
import { radioAndTvPath } from '../utils/regex';

export default {
  path: radioAndTvPath,
  exact: true,
  component: RadioPage,
  getInitialData,
  pageType: 'media',
};
