/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';

const { CONTINUE_READING_BUTTON } = COMPONENTS;

export const assertContinueReadingButtonComponentView = ({
  applicationType,
  pageIdentifier,
  contentType,
  siteId,
}: AtiAssertionFnProps) => {
  const itOrSkip = applicationType !== 'responsive' ? it.skip : it;

  itOrSkip(
    'should send a view event for the Continue Reading Button component',
    () => {
      interceptATIAnalyticsBeacons();

      // Reload the page to show the continue reading button again
      cy.reload();

      cy.get('[data-testid="continue-reading-button"]').scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: CONTINUE_READING_BUTTON,
        pageIdentifier,
        contentType,
        siteId,
      });
    },
  );
};

export const assertContinueReadingButtonComponentClick = ({
  applicationType,
  pageIdentifier,
  contentType,
  siteId,
}: AtiAssertionFnProps) => {
  const itOrSkip = applicationType !== 'responsive' ? it.skip : it;

  itOrSkip(
    'should send a click event for the Continue Reading Button component',
    () => {
      interceptATIAnalyticsBeacons();

      // Reload the page to show the continue reading button again
      cy.reload();

      cy.get('[data-testid="continue-reading-button"]').scrollIntoView({
        duration: 1000,
      });

      cy.get('[data-testid="continue-reading-button"]').click({ force: true });

      assertATIComponentClickEvent({
        component: CONTINUE_READING_BUTTON,
        pageIdentifier,
        contentType,
        siteId,
      });
    },
  );
};
