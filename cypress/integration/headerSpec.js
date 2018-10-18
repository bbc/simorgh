import {
  getElement,
  shouldContainText,
  shouldContainStyles,
} from '../support/bodyTestHelper';

describe('Header Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/news/articles/c9rpqy7pmypo');
    // Only 'c9rpqy7pmypo' & 'c85pqyj5m2ko' are available within the PROD enviroment
  });

  it('should render the BBC News branding', () => {
    const headerBranding = getElement('header div');
    shouldContainStyles(headerBranding, 'height', '80px');
    shouldContainStyles(headerBranding, 'background-color', 'rgb(184, 0, 0)');
  });

  it('should have a focused state', () => {
    const anchorElement = getElement('header a');
    shouldContainText(anchorElement, 'BBC News');

    anchorElement.focus();
    shouldContainStyles(
      getElement('header a span'),
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
  });
});
