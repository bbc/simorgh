import {
  clickInlineLinkAndTestPageHasHTML,
  checkElementStyles,
  checkElementStylesWithText,
  checkHeadline,
  getElement,
  placeholderImageLoaded,
  shouldContainText,
  shouldContainStyles,
  visibleImage,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c9rpqy7pmypo' & 'c85pqyj5m2ko' are available within the PROD enviroment
    cy.visit('/news/articles/c9rpqy7pmypo');
  });

  it('should render a headline', () => {
    checkHeadline('h1');
    checkElementStyles(
      'h1',
      'rgb(34, 34, 34)',
      'ReithSerifNewsMedium, Helvetica, Arial, sans-serif',
    );
  });

  it('should render a timestamp', () => {
    cy.window().then(win => {
      const { lastUpdated } = win.SIMORGH_DATA.data.metadata;
      const timeStamp = Cypress.moment(lastUpdated).format('D MMMM YYYY');

      checkElementStylesWithText(
        'time',
        timeStamp,
        'rgb(90, 90, 90)',
        'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
      );
    });
  });

  it('should render a subheading', () => {
    checkElementStylesWithText(
      'h2',
      "Queen Victoria's myrtle",
      'rgb(64, 64, 64)',
      'ReithSansNewsRegular, Helvetica, Arial, sans-serif',
    );
  });

  it('should render a paragraph', () => {
    const p = getElement('p');
    shouldContainText(
      p,
      'The Duchess of Sussex has followed tradition by having her bridal bouquet placed on the tomb of the unknown warrior at Westminster Abbey.',
    );
  });

  it('should have a placeholder image', () => {
    placeholderImageLoaded(getElement('figure div').eq(0));
  });

  it('should render the first image', () => {
    visibleImage('img');
  });

  it('should have a visible image without a caption', () => {
    visibleImageNoCaption(getElement('figure').eq(0));
  });

  it('should have a visible image with a caption', () => {
    visibleImageWithCaption(getElement('figure').eq(2));
  });

  it('should have an image copyright label with styling', () => {
    const copyrightLabel = getElement('figure')
      .eq(0)
      .within(() => {
        getElement('p').eq(0);
      });
    copyrightLabel.should('contain', 'PA');
    shouldContainStyles(
      copyrightLabel,
      'background-color',
      'rgba(34, 34, 34, 0.75)',
    );
    shouldContainStyles(copyrightLabel, 'color', 'rgb(255, 255, 255)');
  });

  // it('should render a title', () => {
  //   renderedTitle(
  //     "Meghan's bouquet laid on tomb of unknown warrior – BBC News",
  //   );
  // });

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
