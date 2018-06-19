import { testResponseCode } from '../../../cypress/integration/test-helper';

describe('Storybook Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Storybook');
  });
});

describe('Page Status', () => {
  it('should display 200', () => {
    testResponseCode('/', 200);
  });
});
