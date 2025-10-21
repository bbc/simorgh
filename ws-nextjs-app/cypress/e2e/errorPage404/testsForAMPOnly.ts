import { ServiceParametersType } from '../../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, path }: ServiceParametersType) =>
  describe(`Amp Tests for ${service} ${pageType}`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType({
        path: `${path}.amp`,
        responseCode: 404,
        type: 'text/html',
      });
    });
  });
