import paths from 'ramda/src/paths';
import { LanguagesPageProps } from '#nextjs/pages/ws/types';
import { ArticleContent } from '#app/models/types/optimo';
import envConfig, { EnvironmentConfigType } from '../../support/config/envs';

export const hasMedia = (pageData: LanguagesPageProps['pageData']) => {
  const mediaTypes = ['video', 'version', 'media', 'legacyMedia'];
  return mediaTypes.some(type => pageData.metadata.blockTypes.includes(type));
};

const getMediaId = (pageData: LanguagesPageProps['pageData']) => {
  const mediaBlock = pageData.promo.media;

  const [versionId, externalId, id] = paths(
    [['versions', 0, 'versionId'], ['externalId'], ['id']],
    mediaBlock,
  );

  return versionId || externalId || id;
};

const getCAFMediaID = (pageData: LanguagesPageProps['pageData']) => {
  const mediaBlock = pageData.promo.extrinsicPromo?.media;
  const aresMediaBlock = (mediaBlock?.blocks[0] as ArticleContent).model
    .blocks[1];
  const aresMediaMetadataBlock = (aresMediaBlock as ArticleContent).model
    .blocks[0].model;

  const [versionId, externalId, id] = paths(
    [['versions', 0, 'versionId'], ['externalId'], ['id']],
    aresMediaMetadataBlock,
  );

  return versionId || externalId || id;
};

export const getEmbedUrl = (
  pageData: LanguagesPageProps['pageData'],
  language: string,
  isAmp = false,
) => {
  const prefix =
    pageData.promo.media?.type === 'legacyMedia' ? 'legacy' : 'cps';

  const mediaID = getMediaId(pageData) || getCAFMediaID(pageData);
  const environementConfig = envConfig as EnvironmentConfigType;
  const embedUrl = [
    isAmp
      ? environementConfig.avEmbedBaseUrlAmp
      : environementConfig.avEmbedBaseUrlCanonical,
    'ws/av-embeds',
    `${prefix}${pageData.metadata.locators?.assetUri}`,
    mediaID,
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};
