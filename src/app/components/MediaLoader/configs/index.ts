import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import { MediaBlockType } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exhaustiveMatchGuard = (_: never) => null;

export default (mediaBlockType: MediaBlockType) => {
  switch (mediaBlockType) {
    case 'clipMedia':
      return clipMedia;
    case 'aresMedia':
      return aresMedia;
    default:
      return exhaustiveMatchGuard(mediaBlockType);
  }
};
