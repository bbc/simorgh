import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import testsForCanonicalOnly from './testsForCanonicalOnly';
// import testsForAMPOnly from './testsForAMPOnly';

// eslint-disable-next-line no-unused-vars
const hasAds = serviceName => {
  return true;
};

Object.keys(config)
  .filter(hasAds)
  .forEach(serviceId => {
    const serviceName = config[serviceId].name;
    Object.keys(config[serviceId].pageTypes)
      .filter(pageType => pageType.includes('mediaAssetPage'))
      .forEach(pageType => {
        const paths = getPaths(serviceId, pageType);
        paths.forEach(path => {
          testsForCanonicalOnly({
            serviceId,
            serviceName,
            pageType,
            path,
          });
        });
        // paths
        //   .map(path => `${path}.amp`)
        //   .forEach(path => {
        //
        //     testsForAMPOnly({
        //       serviceName,
        //       pageType,
        //       path,
        //     });
        //   });
      });
  });
