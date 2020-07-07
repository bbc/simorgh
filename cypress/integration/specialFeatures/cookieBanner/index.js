import ramdaPath from 'ramda/src/path';
import config from '../../../support/config/services';
import describeForEuOnly from '../../../support/helpers/describeForEuOnly';
import visitPage from '../../../support/helpers/visitPage';
import environment from '../../../support/helpers/getAppEnv';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import runCanonicalTests from './testsForCanonicalOnly';
import runAmpTests from './testsForAMPOnly';

const serviceFilter = service => {
  // If smoke testing, check the special features config where smoke: true
  const smokeServices = ramdaPath(
    [service, 'specialFeatures', 'cookieBanner', 'smoke'],
    config,
  );

  // If not smoke testing, check the special features config for where the tests are enabled for the current environment
  const nonSmokeServicesForEnvironment = ramdaPath(
    [
      service,
      'specialFeatures',
      'cookieBanner',
      'environments',
      environment(),
      'enabled',
    ],
    config,
  );

  return Cypress.env('SMOKE') ? smokeServices : nonSmokeServicesForEnvironment;
};

const getPaths = service => {
  const environmentConfig = ramdaPath(
    [service, 'specialFeatures', 'cookieBanner', 'environments', environment()],
    config,
  );

  return environmentConfig.enabled ? environmentConfig.paths : [];
};

Object.keys(config).forEach(service => {
  const { variant } = config[service];

  Object.keys(config[service].pageTypes)
    .filter(pageType => serviceHasPageType(service, pageType))
    .filter(() => serviceFilter(service))
    .forEach(pageType => {
      const paths = getPaths(service);
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
