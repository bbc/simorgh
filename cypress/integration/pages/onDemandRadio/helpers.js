import envConfig from '../../../support/config/envs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = externalId =>
  externalId.replace('bbc_oromo_radio', 'bbc_afaanoromoo_radio');

const getServiceName = producerName =>
  producerName.toLowerCase().replace('indonesian', 'indonesia');

export default (body, language) => {
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
