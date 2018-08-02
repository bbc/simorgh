import {
  getElement,
  shouldContainText,
  shouldContainStyles,
} from '../support/testHelper';

describe('News Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/article/article-id');
  });

  it('should render the BBC News branding', () => {
    const headerElement = getElement('header');
    shouldContainStyles(headerElement, 'height', '80px');
    shouldContainStyles(headerElement, 'background-color', 'rgb(184, 0, 0)');

    const anchorElement = getElement('header a');
    shouldContainText(anchorElement, 'BBC News');

    anchorElement.focus();
    shouldContainStyles(
      anchorElement.focused(),
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
  });
});
