import {
  clickInlineLinkAndTestPageHasHTML,
  checkElementStyles,
  copyrightDataWindow,
  getElement,
  headlineDataWindow,
  subheadlineDataWindow,
  paragraphDataWindow,
  placeholderImageLoaded,
  renderedTitle,
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

  it('should render an H1, which contains/displays a styled headline', () => {
    headlineDataWindow('headline');
  });

  it('should render a formatted timestamp', () => {
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

  it('should render an H2, which contains/displays a styled subheading', () => {
    subheadlineDataWindow('subheadline');
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

  it('should have an image copyright label with styling', () => {
    copyrightDataWindow('image');
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
