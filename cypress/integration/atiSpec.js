import config from '../support/config';
import {
  hasNoscriptImgAtiUrl,
  hasAmpAnalyticsAtiUrl,
} from '../support/bodyTestHelper';
import { describeForLocalOnly } from '../support/limitEnvRuns';

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
