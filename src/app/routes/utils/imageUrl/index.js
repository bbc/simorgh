import is from 'ramda/src/is';

export const FALLBACK_PLACEHOLDER_IMAGE_URL = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/media_placeholder.png`;

export const getPlaceholderImageUrl = imageUrl => {
  if (imageUrl && is(String, imageUrl)) {
    return `https://${imageUrl.replace('$recipe', '1024x576')}`;
  }

  return FALLBACK_PLACEHOLDER_IMAGE_URL;
};
