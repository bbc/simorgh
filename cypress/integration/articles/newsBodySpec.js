import config from '../../support/configOld';
import {
  firstHeadlineDataWindow,
  firstParagraphDataWindow,
  firstSubheadlineDataWindow,
  placeholderImageLoaded,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../../support/bodyTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${config.assets.newsThreeSubheadlines}`);
  });

  it('should render an H1, which contains/displays a styled headline', () => {
    firstHeadlineDataWindow();
  });

  it('should render a formatted timestamp', () => {
    cy.window().then(win => {
      const { lastPublished } = win.SIMORGH_DATA.pageData.metadata;
      const timeStamp = Cypress.moment(lastPublished).format('D MMMM YYYY');
      cy.get('time').should('contain', timeStamp);
    });
  });

  it('should render an H2, which contains/displays a styled subheading', () => {
    firstSubheadlineDataWindow();
  });

  it('should render a paragraph, which contains/displays styled text', () => {
    firstParagraphDataWindow();
  });

  it('should have a placeholder image', () => {
    placeholderImageLoaded(cy.get('figure div').eq(0));
  });

  it('should have a visible image without a caption, and also not be lazyloaded', () => {
    const firstFigure = cy.get('figure').eq(0);

    visibleImageNoCaption(firstFigure);
    firstFigure.within(() => cy.get('noscript').should('not.exist'));
  });

  it('should have a visible image with a caption that is lazyloaded and has a noscript fallback image', () => {
    const imageHasNotLoaded = cy.get('figure').eq(2);

    imageHasNotLoaded.within(() => {
      const lazyLoadPlaceholder = cy.get('div div');
      lazyLoadPlaceholder.should('have.class', 'lazyload-placeholder');
    });

    imageHasNotLoaded.scrollIntoView();

    const imageHasLoaded = cy.get('figure').eq(2);

    visibleImageWithCaption(imageHasLoaded);
    imageHasLoaded.within(() => {
      const noscriptImg = cy.get('noscript');
      noscriptImg.contains('<img ');

      const ImageContainer = cy.get('div div');
      ImageContainer.should('not.have.class', 'lazyload-placeholder');
    });
  });

  // it('should have an inline link', () => {
  //   cy.get('main a');
  // });

  // it('should have a working first inline link', () => {
  //   clickInlineLinkAndTestPageHasHTML(
  //     'main a',
  //     `${config.assets.news}`,
  //   );
  // });

  // This test is commented out because we are unable to run it on TEST as it requires a cert in order to work.
});
