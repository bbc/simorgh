import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { CANONICAL_LITE_CTA } = COMPONENTS;

export const assertCanonicalToLiteSiteCTAComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Canonical to Lite Site CTA component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="to-lite-site"]').scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: CANONICAL_LITE_CTA,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertCanonicalToLiteSiteCTAComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Canonical to Lite Site CTA component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="to-lite-site"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="to-lite-site"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: CANONICAL_LITE_CTA,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};
