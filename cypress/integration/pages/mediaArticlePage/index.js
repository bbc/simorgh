import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import getUrls from './urls';
import getAppEnv from '../../../support/helpers/getAppEnv';
import visitPage from '../../../support/helpers/visitPage';
import getAmpUrl from '../../../support/helpers/getAmpUrl';
import runTests from './commonTests';
import ampTest from './AMPTestOnly';
import canonicalTest from './CanonicalTestOnly';

const pageType = MEDIA_ARTICLE_PAGE;

const urls = getUrls();

urls.forEach(url => {
  const { service, variant = 'default' } = url;
  const currentPath = url[getAppEnv()];

  if (currentPath) {
    describe(`Tests for ${pageType} page - ${currentPath}`, () => {
      describe(`Canonical pages`, () => {
        before(() => {
          Cypress.env('currentPath', currentPath);
          visitPage(currentPath, pageType);
        });
        runTests({ service, pageType, variant });
        canonicalTest({ service, pageType, variant });
      });

      describe(`AMP pages`, () => {
        before(() => {
          Cypress.env('currentPath', currentPath);
          visitPage(getAmpUrl(currentPath), pageType);
        });
        runTests({ service, pageType, variant });
        ampTest({ service, pageType, variant });
      });
    });
  }
});
