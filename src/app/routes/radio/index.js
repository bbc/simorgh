import getInitialData from './getInitialData';
import { radioAndTvPath } from '../regex';
import RadioPage from '../../containers/RadioPageMain';
import enhancePage from './enhancePage';

const enhancedRadioPage = enhancePage(RadioPage);

export default {
  path: radioAndTvPath,
  exact: true,
  component: enhancedRadioPage,
  getInitialData,
  pageType: 'media',
};
