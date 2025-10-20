import { ServiceParametersType } from '../../types';

export default ({ path }: ServiceParametersType) => {
  describe('Live page visit', () => {
    it('visits page and passes', () => {
      if (path) {
        cy.visit(path);
      }
    });
  });
};
