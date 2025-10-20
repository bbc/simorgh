import { ServiceParametersType } from '../../types';
import chartbeatTests from '../../support/helpers/chartbeatTests';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType }: ServiceParametersType) => {
  describe(`Canonical tests for ${service} ${pageType}`, () => {
    chartbeatTests();
  });
};
