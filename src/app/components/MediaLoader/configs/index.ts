import { PageTypes } from '#app/models/types/global';
import livePage from './livePage';
import article from './article';

export default (pageType: PageTypes) => {
  switch (pageType) {
    case 'live':
      return livePage;
    case 'article':
    case 'mediaArticle':
      return article;
    default:
      return null;
  }
};
