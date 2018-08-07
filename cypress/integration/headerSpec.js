import {
  getElement,
  shouldContainText,
  shouldContainStyles,
} from '../support/testHelper';

describe('Header Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/article/scenario-25');
    // Only 'scenario-25' & 'scenario-27' are available within the PROD enviroment
  });

  it('should render the BBC News branding', () => {
    const headerElement = getElement('header');
    shouldContainStyles(headerElement, 'height', '80px');
    shouldContainStyles(headerElement, 'background-color', 'rgb(184, 0, 0)');
  });

  it('should have a focused state', () => {
    const anchorElement = getElement('header a');
    shouldContainText(anchorElement, 'BBC News');

    anchorElement.focus();
    shouldContainStyles(
      cy.focused(),
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
  });

  it('should have a hover state', () => {
    const anchorElement = getElement('header a');
    anchorElement.invoke('mouseover');

    shouldContainStyles(
      anchorElement,
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
  });
});
