import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = externalId =>
  externalId.replace('bbc_oromo_radio', 'bbc_afaanoromoo_radio');

const getServiceName = producerName =>
  producerName.toLowerCase().replace('indonesian', 'indonesia');

export const getEmbedUrl = (body, language) => {
  const externalId = body.metadata.createdBy;
  const brandId = getBrandId(externalId);
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
  const versions = path(['content', 'blocks', '0', 'versions'], jsonData);

  // Episode is expired if versions is empty
  return versions.length === 0;
};

export const dataEndpointOverride = () => {
  if (Cypress.env('APP_ENV') === 'test') {
    return '?renderer_env=live';
  }
  return '';
};
