import {
  MEDIA_ASSET_REVOKED,
  MEDIA_ASSET_EXPIRED,
  MEDIA_METADATA_UNAVAILABLE,
} from '#lib/logger.const';
/* eslint-disable import/prefer-default-export */

export const logMediaError = ({ logger, mediaBlock, url }) => {
  const { statusCode } = mediaBlock;
  switch (statusCode) {
    case 404:
      logger.warn(MEDIA_ASSET_REVOKED, { url, mediaBlock });
      break;
    case 410:
      logger.warn(MEDIA_ASSET_EXPIRED, { url, mediaBlock });
      break;
    default:
      logger.error(MEDIA_METADATA_UNAVAILABLE, { url, mediaBlock });
  }
};
