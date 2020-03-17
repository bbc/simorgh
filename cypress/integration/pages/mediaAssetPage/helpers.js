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

const getServiceId = body => {
  const mediaBlock = body.promo.media;
  const versionId = mediaBlock.versions && mediaBlock.versions[0].versionId;
  const id = mediaBlock.externalId || mediaBlock.id;

  return versionId || id;
};

export const getEmbedUrl = (body, language) => {
  const isLegacyMedia = body.promo.media.type === 'legacyMedia';
  const prefix = isLegacyMedia ? 'legacy' : 'cps';

  return [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds',
    `${prefix}${body.metadata.locators.assetUri}`,
    getServiceId(body),
    language,
  ].join('/');
};
