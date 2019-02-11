import {
  headlineDataWindow,
  getElement,
  paragraphDataWindow,
  placeholderImageLoaded,
  renderedTitle,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'cwv2xv848j5o' is available within the PROD enviroment
    cy.visit('/persian/articles/cwv2xv848j5o');
  });

  it('should render an H1, which contains/displays a styled headline', () => {
    headlineDataWindow('headline');
  });

  it('should render a paragraph, which contains/displays styled text', () => {
    paragraphDataWindow('text');
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
