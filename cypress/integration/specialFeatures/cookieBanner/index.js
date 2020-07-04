import ramdaPath from 'ramda/src/path';
import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import describeForEuOnly from '../../../support/helpers/describeForEuOnly';
import visitPage from '../../../support/helpers/visitPage';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import runCanonicalTests from './testsForCanonicalOnly';
import runAmpTests from './testsForAMPOnly';

const serviceFilter = (service, pageType) =>
  Cypress.env('SMOKE')
    ? ['news', 'pashto'].includes(service)
    : ramdaPath([service, 'pageTypes', pageType, 'smoke'], config);

Object.keys(config).forEach(service => {
  const { variant } = config[service];

  Object.keys(config[service].pageTypes)
    .filter(pageType => serviceHasPageType(service, pageType))
    .filter(pageType => serviceFilter(service, pageType))
    .forEach(pageType => {
      const paths = getPaths(service, pageType);
      paths.forEach(path => {
        describeForEuOnly(
          `${service} ${pageType} ${path} - Canonical Cookie Banner`,
          () => {
            beforeEach(() => {
              visitPage(path, pageType);
            });

            runCanonicalTests({ service, variant, pageType, path });
          },
        );
      });

      paths
        .map(path => `${path}.amp`)
        .forEach(path => {
          describeForEuOnly(
            `${service} ${pageType} ${path} - AMP Cookie Banner`,
            () => {
              beforeEach(() => {
                visitPage(path, pageType);
              });

              runAmpTests({ service, variant, pageType, path });
            },
          );
        });
    });
});
