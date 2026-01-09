/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

const { ARTICLE_LITE_SITE_LINK } = COMPONENTS;

export const assertArticleLiteSiteLinkComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Article Lite Site Link component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="article-lite-site-link"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: ARTICLE_LITE_SITE_LINK,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertArticleLiteSiteLinkComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
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
      applicationType,
      siteId,
    });
  });
};
