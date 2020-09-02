import envConfig from '../../../support/config/envs';
import serviceConfig from '../../../../src/server/utilities/serviceConfigs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = externalId =>
  externalId === 'bbc_oromo_radio' ? 'bbc_afaanoromoo_radio' : externalId;

export const getEmbedUrl = (body, language, isAmp = false) => {
  const { externalId } = body.content.blocks[2];
  const brandId = getBrandId(externalId);

  const embedUrl = [
    isAmp ? envConfig.avEmbedBaseUrlAmp : envConfig.avEmbedBaseUrlCanonical,
    'ws/av-embeds/media',
    brandId,
    'liveradio',
    language,
  ].join('/');

  return isAmp ? `${embedUrl}/amp` : embedUrl;
};

export const serviceHasRadioSchedule = ({ service, variant, toggleKey }) => {
  return serviceConfig[service][variant].radioSchedule[toggleKey];
};
