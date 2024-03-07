import { PageTypes } from '#app/models/types/global';
import livePage from './livePage';

export default (pageType: PageTypes) => {
  switch (pageType) {
    case 'live':
      return livePage;
    default:
      return livePage;
  }
};
