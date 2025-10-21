import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';

const { ARTICLE_LITE_SITE_LINK } = COMPONENTS;

export const assertArticleLiteSiteLinkComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a view event for the Article Lite Site Link component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="article-lite-site-link"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: ARTICLE_LITE_SITE_LINK,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertArticleLiteSiteLinkComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a click event for the Article Lite Site Link component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="article-lite-site-link"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="article-lite-site-link"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: ARTICLE_LITE_SITE_LINK,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};
