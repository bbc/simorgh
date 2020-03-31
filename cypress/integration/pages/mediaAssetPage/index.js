import runAmpUserTests from './testsForAMPOnly';
import runCanonicalUserTests from './testsForCanonicalOnly';
import config from '../../../support/config/services';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import getPaths from '../../../support/helpers/getPaths';
import { visitPage } from '../../../support/helpers/runTestsForPage';

const pageType = 'mediaAssetPage';

Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(service => {
    const paths = getPaths(service, pageType);

    paths.forEach(path => {
      describe(`${pageType} User Tests for ${service} - ${path}`, () => {
        describe('Canonical', () => {
          beforeEach(() => {
            Cypress.env('currentPath', path);
            visitPage(path, pageType);
          });

          runCanonicalUserTests({ service, pageType });
        });

        describe('AMP', () => {
          const ampPath = `${path}.amp`;

          beforeEach(() => {
            Cypress.env('currentPath', ampPath);
            visitPage(ampPath, pageType);
          });

          runAmpUserTests({ service, pageType });
        });
      });
    });
  });
