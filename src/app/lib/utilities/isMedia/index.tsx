export const MEDIA_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  PHOTO_GALLERY: 'photogallery',
} as const;

export type MediaType = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES];

const isMedia = (type: string): boolean => {
  return Object.values(MEDIA_TYPES).includes(type as MediaType);
};

export default isMedia;
