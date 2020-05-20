/* eslint-disable no-console */
import services from '../../../support/config/services';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import getPaths from '../../../support/helpers/getPaths';
import visitPage from '../../../support/helpers/visitPage';
import getAppEnv from '../../../support/helpers/getAppEnv';

import runAmpTests from './testsForAMPOnly';
import runCanonicalTests from './testsForCanonicalOnly';
import runCrossPlatformTests from './tests';
import { getEpisodeId } from './helpers';

const pageType = 'onDemandRadioEpisode';

const getCurrentPath = async path => {
  let currentPath = path;
  if (getAppEnv() !== 'local') {
    const episodeId = await getEpisodeId(path);
    currentPath = path.replace('$latestEpisodeId', episodeId);
  }
  Cypress.env('currentPath', currentPath);
  return currentPath;
};

Object.keys(services)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(service => {
    const [path] = getPaths(service, pageType);
    const { variant } = services[service];

    const testArgs = { service, pageType, variant };

    describe(`${service}`, () => {
      beforeEach(() => {
        getCurrentPath(path);
      });

      describe(`${Cypress.env('currentPath')} - Canonical`, () => {
        beforeEach(() => {
          visitPage(Cypress.env('currentPath'), pageType);
        });

        runCrossPlatformTests(testArgs);
        runCanonicalTests(testArgs);
      });

      describe(`${Cypress.env('currentPath')} - AMP`, () => {
        beforeEach(() => {
          visitPage(`${Cypress.env('currentPath')}.amp`, pageType);
        });

        runCrossPlatformTests(testArgs);
        runAmpTests(testArgs);
      });
    });
  });
