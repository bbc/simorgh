import { MEDIA_TYPES } from '#app/legacy/components/Promo';

const isMedia = (type: string): boolean => {
  return Object.values(MEDIA_TYPES).includes(type);
};

export default isMedia;
