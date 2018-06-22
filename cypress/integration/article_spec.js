import {
  getElement,
  shouldContainText,
  shouldContainStyles,
  shouldHaveMetadata,
} from './test-helper';

describe('News Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/article/article-id');
  });

  it('should render the BBC News branding', () => {
    const headerElement = getElement('header');
    shouldContainStyles(headerElement, 'height', '40px');
    shouldContainStyles(headerElement, 'background-color', 'rgb(187, 25, 25)');

    const anchorElement = getElement('header a');
    shouldContainText(anchorElement, 'BBC News');
    shouldContainStyles(anchorElement, 'color', 'rgb(255, 255, 255)');
    shouldContainStyles(
      anchorElement,
      'font-family',
      'ReithSans, Arial, Helvetica, freesans, sans-serif',
    );
  });

  it('should render a headline', () => {
    const h1 = getElement('h1');
    shouldContainText(h1, 'Article Headline');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Article Headline');
  });

  it('should have a nofollow meta tag', () => {
    const metaElement = getElement('head meta[name="robots"]');
    shouldHaveMetadata(metaElement, 'nofollow');
  });
});
