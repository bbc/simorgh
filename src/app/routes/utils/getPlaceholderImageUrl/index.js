import is from 'ramda/src/is';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

export const FALLBACK_PLACEHOLDER_IMAGE_URL = `${
  getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN
}${
  getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_PATH
}images/media_placeholder.png`;

const getPlaceholderImageUrl = imageUrl => {
  if (imageUrl && is(String, imageUrl)) {
    return `https://${imageUrl.replace('$recipe', '1024x576')}`;
  }

  return FALLBACK_PLACEHOLDER_IMAGE_URL;
};

export default getPlaceholderImageUrl;
