import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code

const getServiceName = producerName =>
  producerName.toLowerCase().replace('indonesian', 'indonesia');

export const getEmbedUrl = (body, language) => {
  const externalId = body.metadata.createdBy;
  const brandId = externalId;
  const producerName = body.metadata.analyticsLabels.producer;
  const serviceName = getServiceName(producerName);
  const { pid } = body.metadata.locators;

  return [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds/media',
    serviceName,
    brandId,
    pid,
    language,
  ].join('/');
};

export const isExpired = jsonData => {
  const episodeAvailableUntil = path(
    ['content', 'blocks', '0', 'versions', '0', 'availableUntil'],
    jsonData,
  );

  // Episode is expired if availableUntil is empty
  return !episodeAvailableUntil || episodeAvailableUntil < Date.now();
};

export const dataEndpointOverride = () => {
  if (Cypress.env('APP_ENV') === 'test') {
    return '?renderer_env=live';
  }
  return '';
};
