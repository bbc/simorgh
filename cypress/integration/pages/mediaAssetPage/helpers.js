import paths from 'ramda/src/paths';
import envConfig from '../../../support/config/envs';

export const getBlockByType = (blocks, blockType) => {
  let blockData;

  blocks.forEach(block => {
    if (!blockData && block.type === blockType) {
      blockData = block;
    }
  });
  return blockData;
};

export const getBlockData = (blockType, body) => {
  const { blocks } = body.content.model;

  return getBlockByType(blocks, blockType);
};

export const hasMedia = body => {
  const mediaTypes = ['video', 'version', 'media', 'legacyMedia'];
  return mediaTypes.some(type => body.metadata.blockTypes.includes(type));
};

const getMediaId = body => {
  const mediaBlock = body.promo.media;

  const [versionId, externalId, id] = paths(
    [['versions', 0, 'versionId'], ['externalId'], ['id']],
    mediaBlock,
  );

  return versionId || externalId || id;
};

export const getEmbedUrl = ({ jsonData, language, isAmp = false }) => {
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
