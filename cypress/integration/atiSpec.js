import config from '../support/config';
import { describeForLocalOnly } from '../support/limitEnvRuns';

const hasNoscriptImgAtiUrl = (atiUrl, analyticsBucketId) => {
  cy.get('noscript')
    .eq(0)
    .should(
      'contain',
      `<img height="1px" width="1px" alt="" src="${atiUrl}s=${analyticsBucketId}`,
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
      cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);
      hasNoscriptImgAtiUrl(config.atiUrl, '');
    });
  });
  describe('AMP page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}.amp`);
      hasAmpAnalyticsAtiUrl(config.atiUrl, '');
    });
  });
});

describeForLocalOnly('ATI for Persian', () => {
  describe('Canonical page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/persian/articles/${config.assets.persian}`);
      hasNoscriptImgAtiUrl(config.atiUrl, config.atiAnalyticsWSBucket);
    });
  });
  describe('AMP page', () => {
    it('should have a noscript tag with an 1px image with the ati url', () => {
      cy.visit(`/persian/articles/${config.assets.persian}.amp`);
      hasAmpAnalyticsAtiUrl(config.atiUrl, config.atiAnalyticsWSBucket);
    });
  });
});
