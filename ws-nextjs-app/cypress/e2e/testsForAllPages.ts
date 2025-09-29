/* eslint-disable import/no-relative-packages */
/* eslint-disable import/prefer-default-export */
/* eslint-disable cypress/no-unnecessary-waiting */
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import checkA11y from '../../../cypress/support/helpers/checkA11y';
import { ServiceParametersType } from '../types';

export const testsThatAlwaysRunForAllPages = ({
  service,
  pageType,
}: ServiceParametersType) => {
  describe(`testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {
    it('should have no detectable a11y violations on page load', () => {
      checkA11y();
    });
  });
};
