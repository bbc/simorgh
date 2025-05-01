import ramdaPath from 'ramda/src/path';
import config from '../../../support/config/services';
import describeForEuOnly from '../../../support/helpers/describeForEuOnly';
import visitPage from '../../../support/helpers/visitPage';
import environment from '../../../support/helpers/getAppEnv';
import runCanonicalTests from './testsForCanonicalOnly';
import runAmpTests from './testsForAMPOnly';

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
const urlsToExcludeFromAmpTests = ['_tv', '_radio', '/20'];

Object.keys(config)
  .filter(service => serviceFilter(service))
  .forEach(service => {
    const { variant } = config[service];
    const variantPath = variant === 'default' ? '' : `/${variant}`;
    const isHomePagePath = path => path === `/${service}${variantPath}`;

    const paths = getPaths(service);
    paths.forEach(path => {
      describeForEuOnly(`${path} - Canonical Cookie Banner`, () => {
        if (service !== 'news') {
          runCanonicalTests({ service, variant, pageType, path });
        }
      });
    });

    paths
      .filter(path => !isHomePagePath(path))
      .map(path => `${path}.amp`)
      .forEach(path => {
        if (!urlsToExcludeFromAmpTests.some(url => path.includes(url))) {
          describeForEuOnly(`${path} - AMP Cookie Banner`, () => {
            beforeEach(() => {
              visitPage(path, pageType);
            });
            runAmpTests({ service, variant, pageType, path });
          });
        }
      });
  });
