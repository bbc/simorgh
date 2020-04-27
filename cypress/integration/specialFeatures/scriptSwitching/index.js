import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import testsForAMPOnly from './testsForAMPOnly';

const hasVariant = serviceName => {
  return config[serviceName] && config[serviceName].variant !== 'default';
};

Object.keys(config)
  .filter(hasVariant)
  .forEach(serviceId => {
    const { variant } = config[serviceId];
    const serviceName = config[serviceId].name;
    const otherVariant = appConfig[serviceName][variant].scriptLink.variant;
    Object.keys(config[serviceId].pageTypes)
      .filter(
        pageType =>
          serviceHasPageType(serviceId, pageType) &&
          !pageType.includes('error'),
      )
      .forEach(pageType => {
        const paths = getPaths(serviceId, pageType);
        paths.forEach(path => {
          testsForCanonicalOnly({
            serviceId,
            serviceName,
            pageType,
            path,
            variant,
            otherVariant,
          });
        });
        paths
          .map(path => `${path}.amp`)
          .forEach(path => {
            testsForAMPOnly({
              serviceId,
              serviceName,
              pageType,
              path,
              variant,
              otherVariant,
            });
          });
      });
  });
