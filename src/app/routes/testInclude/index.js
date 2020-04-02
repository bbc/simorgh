import getInitialData from './getInitialData';
import { StoryPage } from '#pages';

export default {
  path: '/testInclude',
  exact: true,
  component: StoryPage,
  getInitialData,
  pageType: 'STY',
};
