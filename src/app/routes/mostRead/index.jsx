import MostRead from '#pages/MostReadPage';
import { mostReadPagePath } from '../utils/regex';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostRead,
  getInitialData: () => Promise.resolve({ status: 200 }),
  pageType: 'mostRead',
};
