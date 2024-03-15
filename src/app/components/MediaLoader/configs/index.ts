import clipMedia from './clipMedia';
import aresMedia from './aresMedia';
import { MediaBlockType } from '../types';

const exhaustiveMatchGuard = (value: never) => {
  throw new Error(`Unhandled value: ${value}`);
};

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
