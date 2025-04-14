import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';
import { assertATIComponentClickEvent } from '.';

const { LITE_SITE_CTA } = COMPONENTS;

// eslint-disable-next-line import/prefer-default-export
export const assertLiteSiteCTAComponentClick = ({
  pageIdentifier,
  contentType,
  componentTrackingContentType,
  path,
}) => {
  it('should send a click event for the Lite Site CTA component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="to-main-site"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="to-main-site"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: LITE_SITE_CTA,
      pageIdentifier,
      contentType: componentTrackingContentType || contentType,
    });
  });
};
