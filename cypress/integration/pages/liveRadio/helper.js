// the externalId `bbc_oromo_radio` is overriden to `bbc_afaanoromoo` in production code
const getMappedServiceId = (externalId) =>
  externalId === 'bbc_oromo_radio' ? 'bbc_afaanoromoo_radio' : externalId;

export default getMappedServiceId;
