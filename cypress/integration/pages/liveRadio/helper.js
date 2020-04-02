import envConfig from '../../../support/config/envs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = (externalId) =>
  externalId === 'bbc_oromo_radio' ? 'bbc_afaanoromoo_radio' : externalId;

export default ({ jsonData, language, isAmp = false }) => {
  const { externalId } = jsonData.content.blocks[2];
  const brandId = getBrandId(externalId);

  const embedUrl = [
    envConfig.avEmbedBaseUrl,
    'ws/av-embeds/media',
    brandId,
    'liveradio',
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};
