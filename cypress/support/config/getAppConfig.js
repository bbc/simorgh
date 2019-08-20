import appConfig from '../../../src/app/lib/config/services';

const getConfig = ({ service, serviceVariantConfig }) =>
  serviceVariantConfig ? appConfig[serviceVariantConfig] : appConfig[service];

export default getConfig;
