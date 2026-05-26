import chartbeatTests from '../../../support/helpers/chartbeatTests';
import { ServiceParametersType } from '../../../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType }: ServiceParametersType) => {
  describe(`Canonical tests for ${service} ${pageType}`, () => {
    chartbeatTests();
  });
};
