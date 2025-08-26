import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';
import { assertATIComponentClickEvent } from '.';

const { LITE_SITE_SUMMARY } = COMPONENTS;

// eslint-disable-next-line import/prefer-default-export
export const assertLiteSiteSummaryComponentToMainSiteClick = ({
  pageIdentifier,
  contentType,
  componentTrackingContentType,
  path,
  applicationType,
  siteId,
}) => {
  it(`should send a click event for the Lite Site Summary component to main site link`, () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="to-main-site"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="to-main-site"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: LITE_SITE_SUMMARY,
      pageIdentifier,
      contentType: componentTrackingContentType || contentType,
      applicationType,
      siteId,
    });
  });
};
