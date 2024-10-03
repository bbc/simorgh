import path from 'ramda/src/path';

import envConfig from '../config/envs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = externalId =>
  externalId.replace('bbc_oromo_radio', 'bbc_afaanoromoo_radio');

const getServiceName = producerName =>
  producerName
    .toLowerCase()
    .replace('indonesian', 'indonesia')
    .replace('chinese', 'zhongwen')
    .replace('afaan_oromoo', 'afaanoromoo');

export const getEmbedUrl = ({ body, language, isAmp }) => {
  const externalId = body.metadata.createdBy;
  const brandId = getBrandId(externalId);
  const producerName = body.metadata.analyticsLabels.producer;
  const serviceName = getServiceName(producerName);

  const embedUrl = [
    isAmp ? envConfig.avEmbedBaseUrlAmp : envConfig.avEmbedBaseUrlCanonical,
    'ws/av-embeds/media',
    serviceName,
    brandId,
    path(['content', 'blocks', 0, 'id'], body),
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};

export const getEpisodeAvailability = ({ mediaBlocks }) =>
  mediaBlocks[0]?.model?.availability === 'available';

export const isBrand = jsonData => {
  const pageID = path(
    ['metadata', 'analyticsLabels', 'pageIdentifier'],
    jsonData,
  );
  return pageID.includes('programmes');
};

export const overrideRendererOnTest = () => {
  if (Cypress.env('APP_ENV') === 'test') {
    return '?renderer_env=live';
  }
  return '';
};

export const videoPlaceholderImageUrl = ({ mediaBlocks }) => {
  const imageUrl = mediaBlocks[0]?.model?.imageUrl;

  return imageUrl ? `https://${imageUrl}` : null;
};
