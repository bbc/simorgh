import envConfig from '../support/config/envs';
import services from '../support/config/services';
import {
  hasNoscriptImgAtiUrl,
  hasAmpAnalyticsAtiUrl,
} from '../support/bodyTestHelper';
import {
  describeForLocalOnly,
  describeForLocalAndTest,
} from '../support/limitEnvRuns';

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
