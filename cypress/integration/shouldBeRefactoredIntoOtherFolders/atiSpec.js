import envConfig from '../../support/config/envs';
import services from '../../support/config/services';
import {
  describeForLocalOnly,
  describeForLocalAndTest,
} from '../../support/limitEnvRuns';

// NB: If these tests start failing unexpectedly it's a good sign that the dom is being
// cleared during hydration. React won't render noscript tags on the client so if they
// get cleared during hydration, the following render wont re-add them.
// See https://github.com/facebook/react/issues/11423#issuecomment-341751071 or
// https://github.com/bbc/simorgh/pull/1872 for more infomation.

const hasNoscriptImgAtiUrl = (atiUrl, analyticsBucketId) => {
  cy.get('noscript')
    .eq(0)
    .should(
      'contain',
      `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}s=${analyticsBucketId}`,
    );
};

const hasAmpAnalyticsAtiUrl = (atiUrl, analyticsBucketId) => {
  cy.get('amp-analytics script[type="application/json"]')
    .eq(0)
    .should('contain', `${atiUrl}`)
    .should('contain', `s=${analyticsBucketId}`);
};

describe('Article ATI for News', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
      hasNoscriptImgAtiUrl(envConfig.atiUrl, '');
    });
  });
  describe('AMP page', () => {
    it('should have an amp-analytics tag with the ati url', () => {
      cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}.amp`);
      hasAmpAnalyticsAtiUrl(envConfig.atiUrl, '');
    });
  });
});

describeForLocalOnly('ATI for Persian', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(
        `/persian/articles/${services.persian.pageTypes.articles.asset}`,
      );
      hasNoscriptImgAtiUrl(envConfig.atiUrl, envConfig.atiAnalyticsWSBucket);
    });
  });
  describe('AMP page', () => {
    it('should have an amp-analytics tag with the ati url', () => {
      cy.visit(
        `/persian/articles/${services.persian.pageTypes.articles.asset}.amp`,
      );
      hasAmpAnalyticsAtiUrl(envConfig.atiUrl, envConfig.atiAnalyticsWSBucket);
    });
  });
});

describeForLocalAndTest('ATI for Pidgin front page', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/pidgin`);
      hasNoscriptImgAtiUrl(envConfig.atiUrl, envConfig.atiAnalyticsWSBucket);
    });
  });
  describe('AMP page', () => {
    it('should have an amp-analytics tag with the ati url', () => {
      cy.visit(`/pidgin.amp`);
      hasAmpAnalyticsAtiUrl(envConfig.atiUrl, envConfig.atiAnalyticsWSBucket);
    });
  });
});
