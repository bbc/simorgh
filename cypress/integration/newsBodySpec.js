import {
  clickInlineLinkAndTestPageHasHTML,
  checkElementStyles,
  getBlockData,
  getElement,
  placeholderImageLoaded,
  renderedTitle,
  shouldContainText,
  shouldContainStyles,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c9rpqy7pmypo' & 'c85pqyj5m2ko' are available within the PROD enviroment
    cy.visit('/news/articles/c9rpqy7pmypo');
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

  it('should render a timestamp', () => {
    cy.window().then(win => {
      const { lastPublished } = win.SIMORGH_DATA.data.metadata;
      const timeStamp = Cypress.moment(lastPublished).format('D MMMM YYYY');

      checkElementStyles(
        'time',
        timeStamp,
        'rgb(90, 90, 90)',
        'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
      );
    });
  });

  it('should return a subheading', () => {
    cy.window().then(win => {
      const subheadingData = getBlockData('subheadline', win);
      const { text } = subheadingData.model.blocks[0].model.blocks[0].model;

      checkElementStyles(
        'h2',
        text,
        'rgb(64, 64, 64)',
        'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
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

  it('should have an image copyright label with styling', () => {
    cy.window().then(win => {
      const copyrightData = getBlockData('image', win);
      const { copyrightHolder } = copyrightData.model.blocks[0].model;
      const copyrightLabel = getElement('figure p').eq(0);
      copyrightLabel.should('contain', copyrightHolder);
      shouldContainStyles(
        copyrightLabel,
        'background-color',
        'rgba(34, 34, 34, 0.75)',
      );
      shouldContainStyles(copyrightLabel, 'color', 'rgb(255, 255, 255)');
    });
  });

  it('should render a title', () => {
    cy.window().then(win => {
      const { seoHeadline } = win.SIMORGH_DATA.data.promo.headlines;
      renderedTitle(`${seoHeadline} - BBC News`);
    });
  });

  it('should have an inline link with focus styling', () => {
    const firstInlineLink = getElement('main a');

    firstInlineLink.focus();
    shouldContainStyles(
      firstInlineLink,
      'background-color',
      'rgb(15, 85, 108)',
    );
    shouldContainStyles(firstInlineLink, 'color', 'rgb(245, 243, 241)');
    shouldContainStyles(
      firstInlineLink,
      'border-bottom',
      '1px solid rgb(245, 243, 241)',
    );
  });

  it('should have a working first inline link', () => {
    clickInlineLinkAndTestPageHasHTML('main a', '/news/articles/c85pqyj5m2ko');
  });
});
