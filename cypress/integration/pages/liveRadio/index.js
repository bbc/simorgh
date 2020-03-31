import runAmpUserTests from './testsForAMPOnly';
import runCanonicalUserTests from './testsForCanonicalOnly';
import config from '../../../support/config/services';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import getPaths from '../../../support/helpers/getPaths';
import { visitPage } from '../../../support/helpers/runTestsForPage';

const pageType = 'liveRadio';

Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(service => {
    const paths = getPaths(service, pageType);
    const { variant } = config[service];

    paths.forEach(path => {
      describe(`${pageType} tests for ${service} - ${path}`, () => {
        describe('Canonical', () => {
          before(() => {
            Cypress.env('currentPath', path);
            visitPage(path, pageType);
          });

          runCanonicalUserTests({ service, variant });
        });

        describe('AMP', () => {
          const ampPath = `${path}.amp`;

          before(() => {
            visitPage(ampPath, pageType);
          });

          runAmpUserTests({ service, variant });
        });
      });
    });
  });
