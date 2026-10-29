import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { PODCAST_LINKS } = COMPONENTS;

export const assertPodcastLinksComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a view event for the Podcast Links component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="podcast-links"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: PODCAST_LINKS,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertPodcastLinksComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a click event for the Podcast Links component', () => {
    interceptATIAnalyticsBeacons();
    // The RSS link navigates to an external feed. Hold that navigation so the page isn't
    // unloaded before the click beacon is sent, as a cached feed can load instantly
    cy.intercept('GET', 'https://podcasts.files.bbci.co.uk/**', {
      statusCode: 200,
      body: '',
      delay: 1000,
    });
    cy.visit(path);

    cy.get('[data-e2e="podcast-links"]').scrollIntoView({
      duration: 1000,
    });

    // Click on the RSS link
    cy.get('[data-e2e="podcast-links"]').contains('RSS').click();

    assertATIComponentClickEvent({
      component: PODCAST_LINKS,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
