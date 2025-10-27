import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { BILLBOARD } = COMPONENTS;

export const assertBillboardComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a view event for the Billboard component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="billboard-1"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: BILLBOARD,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertBillboardComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a click event for the Billboard component', () => {
    // This will ignore 'TypeError: window.sendStaticBeacon is not a function' as lite 404 pages do not utilise the sendStaticBeacon yet.
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="billboard-1"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-testid="billboard-1"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: BILLBOARD,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};
