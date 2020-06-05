/* eslint-disable no-console */
import services from '../../../support/config/services';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import getPaths from '../../../support/helpers/getPaths';
import visitPage from '../../../support/helpers/visitPage';

import runAmpTests from './testsForAMPOnly';
import runCanonicalTests from './testsForCanonicalOnly';
import runCrossPlatformTests from './tests';
import { getEpisodeId } from './utilities';

const getCurrentPath = async path => {
  let currentPath = path;
  if (path.includes('$latestEpisodeId')) {
    const episodeId = await getEpisodeId(path);
    currentPath = path.replace('$latestEpisodeId', episodeId);
  }
  Cypress.env('currentPath', currentPath);
};

const getEpisodeType = path => {
  if (path.includes('programmes')) {
    return 'Brand';
  }
  if (path.includes('$latestEpisodeId')) {
    return 'Latest Episode';
  }
  return 'Expired Episode';
};

const pageType = 'onDemandRadio';

Object.keys(services)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(service => {
    const paths = getPaths(service, pageType);
    const { variant } = services[service];

    const testArgs = { service, pageType, variant };

    describe(`${service} - ${pageType}`, () => {
      paths.forEach(path => {
        beforeEach(() => {
          getCurrentPath(path);
        });

        const episodeType = getEpisodeType(path);

        describe(`Canonical - ${path} - ${episodeType}`, () => {
          beforeEach(() => {
            visitPage(Cypress.env('currentPath'), pageType);
          });

          runCrossPlatformTests(testArgs);
          runCanonicalTests(testArgs);
        });

        describe(`AMP - ${path} - ${episodeType}`, () => {
          beforeEach(() => {
            visitPage(`${Cypress.env('currentPath')}.amp`, pageType);
          });

          runCrossPlatformTests(testArgs);
          runAmpTests(testArgs);
        });
      });
    });
  });
