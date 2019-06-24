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
      shouldContainText(
        getElement('time'),
        Cypress.moment(win.SIMORGH_DATA.pageData.metadata.lastPublished).format(
          'D MMMM YYYY',
        ),
      );
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

  it('should have a visible image without a caption, and also not be lazyloaded', () => {
    getElement('figure')
      .eq(0)
      .as('figure')
      .within(() => getElement('noscript').should('not.exist'))
      .then(() => visibleImageNoCaption(getElement('@figure')));
  });

  it('should have a visible image with a caption that is lazyloaded and has a noscript fallback image', () => {
    getElement('figure')
      .eq(2)
      .as('figure')
      .within(() =>
        getElement('div div').should('have.class', 'lazyload-placeholder'),
      )
      .scrollIntoView()
      .then(() => visibleImageWithCaption(getElement('@figure')))
      .within(() => {
        getElement('noscript').contains('<img ');
        getElement('div div').should('not.have.class', 'lazyload-placeholder');
      });
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
