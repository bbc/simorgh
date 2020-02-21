import MostRead from '#pages/MostRead';
import { mostReadPagePath } from '../regex';

export default {
  path: mostReadPagePath,
  exact: true,
  component: MostRead,
  getInitialData: () => Promise.resolve({ status: 200 }),
  pageType: 'mostRead',
};
