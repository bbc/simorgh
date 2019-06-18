import config from '../support/config';
import {
  copyrightDataWindow,
  firstHeadlineDataWindow,
  firstParagraphDataWindow,
  firstSubheadlineDataWindow,
  getElement,
  placeholderImageLoaded,
  renderedTitle,
  shouldContainText,
  visibleImageNoCaption,
  visibleImageWithCaption,
} from '../support/bodyTestHelper';

Object.keys(config.assets).forEach(key => {
  describe('Article Body Tests', () => {
    // eslint-disable-next-line no-undef
    before(() => {
      cy.visit(`/${key}/articles/${config.assets[key]}`);
    });

    it('should render an H1, which contains/displays a styled headline', () => {
      firstHeadlineDataWindow();
    });

    it('should render a paragraph, which contains/displays styled text', () => {
      firstParagraphDataWindow();
    });

    it('should have a placeholder image', () => {
      placeholderImageLoaded(getElement('figure div').eq(0));
    });

    it('should have a visible image without a caption, and also not be lazyloaded', () => {
      const firstFigure = getElement('figure').eq(0);

      visibleImageNoCaption(firstFigure);
      firstFigure.within(() => getElement('noscript').should('not.exist'));
    });

    it('should have a visible image with a caption that is lazyloaded and has a noscript fallback image', () => {
      const imageHasNotLoaded = getElement('figure').eq(2);

      imageHasNotLoaded.within(() => {
        const lazyLoadPlaceholder = getElement('div div');
        lazyLoadPlaceholder.should('have.class', 'lazyload-placeholder');
      });

      imageHasNotLoaded.scrollIntoView();

      const imageHasLoaded = getElement('figure').eq(2);

      visibleImageWithCaption(imageHasLoaded);
      imageHasLoaded.within(() => {
        const noscriptImg = getElement('noscript');
        noscriptImg.contains('<img ');

        const ImageContainer = getElement('div div');
        ImageContainer.should('not.have.class', 'lazyload-placeholder');
      });
    });

    it('should have an image copyright label with styling', () => {
      copyrightDataWindow();
    });

    it('should render a formatted timestamp', () => {
      cy.window().then(win => {
        if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
          const { lastPublished } = win.SIMORGH_DATA.pageData.metadata;
          const timeStamp = Cypress.moment(lastPublished).format('D MMMM YYYY');
          const time = getElement('time');
          shouldContainText(time, timeStamp);
        }
      });
    });

    it('should render a title', () => {
      cy.window().then(win => {
        const { seoHeadline } = win.SIMORGH_DATA.pageData.promo.headlines;
        if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
          renderedTitle(`${seoHeadline} - BBC News`);
        } else {
          renderedTitle(`${seoHeadline} - BBC News فارسی`);
        }
      });
    });

    it('should render an H2, which contains/displays a styled subheading', () => {
      cy.window().then(win => {
        if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
          firstSubheadlineDataWindow();
        }
      });
    });

    it('should have an inline link', () => {
      cy.window().then(win => {
        if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
          getElement('main a');
        }
      });
    });
  });
});
