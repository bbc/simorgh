import ramdaPath from 'ramda/src/path';
import config from '../../../support/config/services';
import describeForEuOnly from '../../../support/helpers/describeForEuOnly';
import environment from '../../../support/helpers/getAppEnv';
import runCanonicalTests from './testsForCanonicalOnly';

const serviceFilter = service => {
  // If smoke testing, check the special features config where smoke: true
  const shouldSmokeTest =
    ramdaPath([service, 'specialFeatures', 'cookieBanner', 'smoke'], config) &&
    ramdaPath(
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

  return Cypress.env('SMOKE') === shouldSmokeTest;
};

const getPaths = service =>
  ramdaPath(
    [
      service,
      'specialFeatures',
      'cookieBanner',
      'environments',
      environment(),
      'paths',
    ],
    config,
  );

const pageType = 'all';

Object.keys(config)
  .filter(service => serviceFilter(service))
  .forEach(service => {
    const { variant } = config[service];

    const paths = getPaths(service);
    paths.forEach(path => {
      describeForEuOnly(`${path} - Canonical Cookie Banner`, () => {
        if (service !== 'news') {
          runCanonicalTests({ service, variant, pageType, path });
        }
      });
    });
  });
