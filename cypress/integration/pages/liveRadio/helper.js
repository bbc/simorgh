import envConfig from '../../../support/config/envs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = (externalId) =>
  externalId === 'bbc_oromo_radio' ? 'bbc_afaanoromoo_radio' : externalId;

export default (body, language) => {
  const { externalId } = body.content.blocks[2];
  const brandId = getBrandId(externalId);

  return [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds/media',
    brandId,
    'liveradio',
    language,
  ].join('/');
};
