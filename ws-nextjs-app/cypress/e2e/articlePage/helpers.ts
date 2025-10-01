import { AresMediaMetadataBlock } from '#app/components/MediaLoader/types';
import { Article, ArticleContent, OptimoBlock } from '#app/models/types/optimo';
import envConfig, { EnvironmentConfigType } from '../../support/config/envs';

export const getBlockByType = <T>(blocks: OptimoBlock[], blockType: string) => {
  const blockData = blocks.find(
    (block: OptimoBlock) => !blockData && block.type === blockType,
  ) as T | undefined;

  return blockData;
};

export const getBlockData = <T = ArticleContent>(
  blockType: string,
  articleData: Article,
) => {
  const blocks = articleData?.content?.model?.blocks;

  if (!blocks) return null;

  return getBlockByType<T>(blocks, blockType);
};

const getArticleId = (articleData: Article) => {
  const { id } = articleData.metadata;
  return id.split('article:')[1];
};

const getVideoPid = (articleData: Article) => {
  const aresMediaBlock = getBlockData('video', articleData)?.model
    .blocks[1] as ArticleContent;

  if (!aresMediaBlock) return null;

  const { versions } = (
    aresMediaBlock.model.blocks[0] as AresMediaMetadataBlock
  ).model;

  return versions[0].versionId;
};

export const getVideoEmbedUrl = (
  articleData: Article,
  language: string,
  isAmp = false,
) => {
  const embedUrl = [
    isAmp
      ? (envConfig as EnvironmentConfigType).avEmbedBaseUrlAmp
      : (envConfig as EnvironmentConfigType).avEmbedBaseUrlCanonical,
    'ws/av-embeds/articles',
    getArticleId(articleData),
    getVideoPid(articleData),
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};
