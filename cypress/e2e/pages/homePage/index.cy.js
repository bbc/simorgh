import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import getUrls from './urls';
import getAppEnv from '../../../support/helpers/getAppEnv';
import visitPage from '../../../support/helpers/visitPage';
import crossPlatformTests from './tests';
import canonicalTests from './testsForCanonicalOnly';

const pageType = HOME_PAGE;

const environment = getAppEnv();
const urls = getUrls();

urls.forEach(url => {
  const { service, variant = 'default' } = url;
  const currentPath = url[environment];

  if (currentPath) {
    describe(`Tests for ${pageType} page - ${currentPath}`, () => {
      before(() => {
        Cypress.env('currentPath', currentPath);
        visitPage(currentPath, pageType);
      });

      crossPlatformTests({
        service,
        pageType,
        variant,
      });

      canonicalTests({ service, pageType, variant });
    });
  }
});
