import services from '../support/config/services';
import { describeForLocalOnly } from '../support/limitEnvRuns';

const source = '//static.chartbeat.com/js/chartbeat.js';
const UID = 50924;

const hasScriptWithChartbeatSrc = chartbeatSource => {
  cy.get(`script`)
    .eq(0)
    .should('have.attr', 'src', `${chartbeatSource}`);
};

const hasGlobalChartbeatConfig = () => {
  cy.window().should('have.property', '_sf_async_config');
};

const hasAmpChartbeatConfigUid = chartbeatUID => {
  cy.get('amp-analytics script[type="application/json"]')
    .eq(1)
    .should('contain', `${chartbeatUID}`);
};

describeForLocalOnly('Chartbeat Analytics for News Article', () => {
  describe('Canonical page', () => {
    before(() => {
      cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
    });
    it('should have a script with src value set to chartbeat source', () => {
      hasScriptWithChartbeatSrc(source);
    });
    it('should have chartbeat config set to window object', () => {
      hasGlobalChartbeatConfig();
    });
  });
  describe('AMP page', () => {
    it('should have chartbeat config UID', () => {
      cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}.amp`);
      hasAmpChartbeatConfigUid(UID);
    });
  });
});

describeForLocalOnly('Chartbeat Analytics for Persian Articles', () => {
  describe('Canonical page', () => {
    before(() => {
      cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
    });
    it('should have a script with src value set to chartbeat source', () => {
      hasScriptWithChartbeatSrc(source);
    });
    it('should have chartbeat config set to window object', () => {
      hasGlobalChartbeatConfig();
    });
  });
  describe('AMP page', () => {
    it('should have chartbeat config UID', () => {
      cy.visit(
        `/persian/articles/${services.persian.pageTypes.articles.asset}.amp`,
      );
      hasAmpChartbeatConfigUid(UID);
    });
  });
});
