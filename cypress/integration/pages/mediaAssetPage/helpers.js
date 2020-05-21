import paths from 'ramda/src/paths';
import envConfig from '../../../support/config/envs';

export const hasMedia = jsonData => {
  const mediaTypes = ['video', 'version', 'media', 'legacyMedia'];
  return mediaTypes.some(type => jsonData.metadata.blockTypes.includes(type));
};

const getMediaId = jsonData => {
  const mediaBlock = jsonData.promo.media;

  const [versionId, externalId, id] = paths(
    [['versions', 0, 'versionId'], ['externalId'], ['id']],
    mediaBlock,
  );

  return versionId || externalId || id;
};

export const getEmbedUrl = (jsonData, language, isAmp = false) => {
  const prefix = jsonData.promo.media.type === 'legacyMedia' ? 'legacy' : 'cps';

  const embedUrl = [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds',
    `${prefix}${jsonData.metadata.locators.assetUri}`,
    getMediaId(jsonData),
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};
