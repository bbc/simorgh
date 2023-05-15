import getUrls from './urls';
import getAppEnv from '../../../support/helpers/getAppEnv';
import visitPage from '../../../support/helpers/visitPage';
import runTests from './tests';

const pageType = 'LIVE';

const urls = getUrls();

urls.forEach(url => {
  const { service, variant = 'default' } = url;
  const currentPath = url[getAppEnv()];

  if (currentPath) {
    describe(`Tests for ${pageType} page - ${currentPath}`, () => {
      before(() => {
        Cypress.env('currentPath', currentPath);
        visitPage(currentPath, pageType);
      });

      runTests({
        service,
        pageType,
        variant,
      });
    });
  }
});
