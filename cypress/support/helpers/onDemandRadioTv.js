import path from 'ramda/src/path';
import pathEq from 'ramda/src/pathEq';
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
  const { pid } = body.metadata.locators;

  const embedUrl = [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds/media',
    serviceName,
    brandId,
    pid,
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};

export const isAvailable = pathEq(
  ['content', 'blocks', '0', 'availability'],
  'available',
);

export const isBrand = jsonData => {
  const pageID = path(
    ['metadata', 'analyticsLabels', 'pageIdentifier'],
    jsonData,
  );
  return pageID.includes('programmes');
};

export const dataEndpointOverride = () => {
  if (Cypress.env('APP_ENV') === 'test') {
    return '?renderer_env=live';
  }
  return '';
};
