import livePage from './livePage';
import article from './article';
import { MediaBlockType } from '../types';

export default (mediaBlockType: MediaBlockType) => {
  switch (mediaBlockType) {
    case 'clipMedia':
      return livePage;
    case 'aresMedia':
      return article;
    default:
      return null;
  }
};
