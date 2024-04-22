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

export const getAllBlocksDataByType = (blockType, body) => {
  return body.data.article.content.model.blocks.filter(
    block => block.type === blockType,
  );
};

export const getAllSocialBlocksByProviderName = (socialType, body) => {
  const social = getAllBlocksDataByType('social', body);
  return social.filter(block => block.model.providerName === socialType);
};

const getArticleId = body => {
  const { id } = body.metadata;
  return id.split('article:')[1];
};

const getVideoPid = body => {
  const aresMediaBlock = getBlockData('video', body).model.blocks[1];
  const { versions } = aresMediaBlock.model.blocks[0].model;
  return versions[0].versionId;
};

export const getVideoEmbedUrl = (body, language, isAmp = false) => {
  const embedUrl = [
    isAmp ? envConfig.avEmbedBaseUrlAmp : envConfig.avEmbedBaseUrlCanonical,
    'ws/av-embeds/articles',
    getArticleId(body),
    getVideoPid(body),
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};
