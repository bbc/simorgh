import envConfig from '../support/config/envs';
import services from '../../cypressSharedHelpers/config/services';
import {
  hasNoscriptImgAtiUrl,
  hasAmpAnalyticsAtiUrl,
} from '../../cypressSharedHelpers/bodyTestHelper';
import {
  describeForLocalOnly,
  describeForLocalAndTest,
} from '../support/limitEnvRuns';

// NB: If these tests start failing unexpectedly it's a good sign that the dom is being
// cleared during hydration. React won't render noscript tags on the client so if they
// get cleared during hydration, the following render wont re-add them.
// See https://github.com/facebook/react/issues/11423#issuecomment-341751071 or
// https://github.com/bbc/simorgh/pull/1872 for more infomation.

describe('Article ATI for News', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
      hasNoscriptImgAtiUrl('');
    });
  });
  describe('AMP page', () => {
    it('should have an amp-analytics tag with the ati url', () => {
      cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}.amp`);
      hasAmpAnalyticsAtiUrl('');
    });
  });
});

describeForLocalOnly('ATI for Persian', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(
        `/persian/articles/${services.persian.pageTypes.articles.asset}`,
      );
      hasNoscriptImgAtiUrl(envConfig.atiAnalyticsWSBucket);
    });
  });
  describe('AMP page', () => {
    it('should have an amp-analytics tag with the ati url', () => {
      cy.visit(
        `/persian/articles/${services.persian.pageTypes.articles.asset}.amp`,
      );
      hasAmpAnalyticsAtiUrl(envConfig.atiAnalyticsWSBucket);
    });
  });
});

describeForLocalAndTest('ATI for Pidgin front page', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/pidgin`);
      hasNoscriptImgAtiUrl(envConfig.atiAnalyticsWSBucket);
    });
  });
  describe('AMP page', () => {
    it('should have an amp-analytics tag with the ati url', () => {
      cy.visit(`/pidgin.amp`);
      hasAmpAnalyticsAtiUrl(envConfig.atiAnalyticsWSBucket);
    });
  });
});
