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

export const getEmbedUrl = ({ body, language, isAmp = false }) => {
  const prefix = body.promo.media.type === 'legacyMedia' ? 'legacy' : 'cps';

  return [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds',
    `${prefix}${body.metadata.locators.assetUri}`,
    getMediaId(body),
    language,
    isAmp ? 'amp' : '',
  ].join('/');
};
