import {
  checkElementStyles,
  getBlockData,
  getElement,
  placeholderImageLoaded,
  renderedTitle,
  shouldContainText,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'cwv2xv848j5o' is available within the PROD enviroment
    cy.visit('/persian/articles/cwv2xv848j5o');
  });

  it('should display a headline', () => {
    cy.window().then(win => {
      const headlineData = getBlockData('headline', win);
      const { text } = headlineData.model.blocks[0].model.blocks[0].model;
      checkElementStyles(
        'h1',
        text,
        'rgb(34, 34, 34)',
        'ReithSerifNewsMedium, Helvetica, Arial, sans-serif',
      );
    });
  });

  it('should render a paragraph', () => {
    cy.window().then(win => {
      const paragraphData = getBlockData('text', win);
      const { text } = paragraphData.model.blocks[0].model;
      const paragraphExample = getElement('p');

      shouldContainText(paragraphExample, text);
    });
  });

  it('should have a placeholder image', () => {
    placeholderImageLoaded(getElement('figure div').eq(0));
  });

  it('should have a visible image without a caption', () => {
    visibleImageNoCaption(getElement('figure').eq(0));
  });

  it('should have a visible image with a caption', () => {
    visibleImageWithCaption(getElement('figure').eq(2));
  });

  it('should render a title', () => {
    cy.window().then(win => {
      const { seoHeadline } = win.SIMORGH_DATA.data.promo.headlines;
      renderedTitle(`${seoHeadline} - BBC News فارسی`);
    });
  });
});
