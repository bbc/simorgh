import config from '../support/config';
import {
  copyrightDataWindow,
  firstHeadlineDataWindow,
  firstParagraphDataWindow,
  firstSubheadlineDataWindow,
  getElement,
  placeholderImageLoaded,
  renderedTitle,
  visibleImageNoCaption,
  visibleImageWithCaption,
  shouldContainText,
} from '../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);
  });

  it('should render an H1, which contains/displays a styled headline', () => {
    firstHeadlineDataWindow();
  });

  it('should render a formatted timestamp', () => {
    cy.window().then(win => {
      const { lastPublished } = win.SIMORGH_DATA.pageData.metadata;
      const timeStamp = Cypress.moment(lastPublished).format('D MMMM YYYY');
      const time = getElement('time');
      shouldContainText(time, timeStamp);
    });
  });

  it('should render an H2, which contains/displays a styled subheading', () => {
    firstSubheadlineDataWindow();
  });

  it('should render a paragraph, which contains/displays styled text', () => {
    firstParagraphDataWindow();
  });

  it('should have a placeholder image', () => {
    placeholderImageLoaded(getElement('figure div').eq(0));
  });

  it('should have a visible image without a caption', () => {
    visibleImageNoCaption(getElement('figure').eq(0));
  });

  it('should have a visible image with a caption that is lazyloaded and has a noscript fallback image', () => {
    let thirdFigure;

    thirdFigure = getElement('figure').eq(2);

    thirdFigure.within(() => {
      const lazyLoadPlaceholder = getElement('div div');
      lazyLoadPlaceholder.should('have.class', 'lazyload-placeholder');

      const noscriptImg = getElement('noscript');
      noscriptImg.contains('<img ');

      cy.scrollTo('bottom', { duration: 200 });

      const ImageContainer = getElement('div div');
      ImageContainer.should('not.have.class', 'lazyload-placeholder');
    });

    thirdFigure = getElement('figure').eq(2);
    visibleImageWithCaption(thirdFigure);
  });

  it('should have an image copyright label with styling', () => {
    copyrightDataWindow();
  });

  it('should render a title', () => {
    cy.window().then(win => {
      const { seoHeadline } = win.SIMORGH_DATA.pageData.promo.headlines;
      renderedTitle(`${seoHeadline} - BBC News`);
    });
  });

  it('should have an inline link', () => {
    getElement('main a');
  });

  // it('should have a working first inline link', () => {
  //   clickInlineLinkAndTestPageHasHTML(
  //     'main a',
  //     `/news/articles/${config.assets.news}`,
  //   );
  // });

  // This test is commented out because we are unable to run it on TEST as it requires a cert in order to work.
});
