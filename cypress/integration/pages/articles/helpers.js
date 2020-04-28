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

const getArticleId = body => {
  const { id } = body.metadata;
  return id.split('article:')[1];
};

const getVideoPid = body => {
  const aresMediaBlock = getBlockData('video', body).model.blocks[1];
  const { versions } = aresMediaBlock.model.blocks[0].model;
  return versions[0].versionId;
};

export const getVideoEmbedUrl = (body, language) =>
  [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds/articles',
    getArticleId(body),
    getVideoPid(body),
    language,
  ].join('/');
