import envConfig from '../../../support/config/envs';
import serviceConfig from '../../../../src/server/utilities/serviceConfigs';

// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getBrandId = externalId =>
  externalId === 'bbc_oromo_radio' ? 'bbc_afaanoromoo_radio' : externalId;

export const getEmbedUrl = (body, language) => {
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

export const serviceHasRadioSchedule = ({ service, variant }) => {
  return serviceConfig[service][variant].radioSchedule.onLiveRadioPage;
};
