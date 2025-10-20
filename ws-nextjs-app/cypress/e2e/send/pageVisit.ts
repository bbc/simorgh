import { ServiceParametersType } from '../../types';

export default ({ path }: ServiceParametersType) => {
  describe('Send page visit', () => {
    it('visits page and passes', () => {
      if (path) {
        cy.visit(path);
      }
    });
  });
};
