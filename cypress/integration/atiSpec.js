import config from '../support/config';
import {
  hasNoscriptImgAtiUrl,
  hasAmpAnalyticsAtiUrl,
} from '../support/bodyTestHelper';
import { describeForLocalOnly } from '../support/limitEnvRuns';

// NB: If these tests start failing unexpectedly it's a good sign that the dom is being
// cleared during hydration. React won't render noscript tags on the client so if they
// get cleared during hydration, the following render wont re-add them.
// See https://github.com/facebook/react/issues/11423#issuecomment-341751071 for more infomation.

describe('Article ATI for News', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);
      hasNoscriptImgAtiUrl('');
    });
  });
  describe('AMP page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}.amp`);
      hasAmpAnalyticsAtiUrl('');
    });
  });
});

describeForLocalOnly('ATI for Persian', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/persian/articles/${config.assets.persian}`);
      hasNoscriptImgAtiUrl(config.atiAnalyticsWSBucket);
    });
  });
  describe('AMP page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/persian/articles/${config.assets.persian}.amp`);
      hasAmpAnalyticsAtiUrl(config.atiAnalyticsWSBucket);
    });
  });
});
