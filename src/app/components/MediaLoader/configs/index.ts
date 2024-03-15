import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import { MediaBlockType } from '../types';

export default (mediaBlockType: MediaBlockType) => {
  switch (mediaBlockType) {
    case 'clipMedia':
      return clipMedia;
    case 'aresMedia':
      return aresMedia;
    default:
      return null;
  }
};
