import config from '../support/config/services';
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
} from '../../cypressSharedHelpers/bodyTestHelper';

const serviceHasArticlePageType = service =>
  config[service].pageTypes.articles !== undefined;

Object.keys(config)
  .filter(serviceHasArticlePageType)
  .forEach(service => {
    describe(`${service} Article Body Tests`, () => {
      // eslint-disable-next-line no-undef
      beforeEach(() => {
        cy.visit(
          `/${service}/articles/${config[service].pageTypes.articles.asset}`,
        );
      });

      it('should render an H1, which contains/displays a styled headline', () => {
        firstHeadlineDataWindow();
      });

      it('should render a formatted timestamp', () => {
        cy.window().then(win => {
          if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
            const { lastPublished } = win.SIMORGH_DATA.pageData.metadata;
            const timeStamp = Cypress.moment(lastPublished).format(
              'D MMMM YYYY',
            );
            const time = getElement('time');
            shouldContainText(time, timeStamp);
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

      it('should render a paragraph, which contains/displays styled text', () => {
        firstParagraphDataWindow();
      });

      it('should have a placeholder image', () => {
        placeholderImageLoaded(getElement('figure div div div').eq(0));
      });

      it('should have a visible image without a caption, and also not be lazyloaded', () => {
        const firstFigure = getElement('figure').eq(0);

        visibleImageNoCaption(firstFigure);
        firstFigure.within(() => getElement('noscript').should('not.exist'));
      });

      it('should have a visible image with a caption that is lazyloaded and has a noscript fallback image', () => {
        const imageHasNotLoaded = getElement('figure').eq(2);

        imageHasNotLoaded.within(() => {
          const lazyLoadPlaceholder = getElement('div div div div');
          lazyLoadPlaceholder.should('have.class', 'lazyload-placeholder');
        });

        imageHasNotLoaded.scrollIntoView();

        const imageHasLoaded = getElement('figure').eq(2);

        visibleImageWithCaption(imageHasLoaded);

        // NB: If this test starts failing unexpectedly it's a good sign that the dom is being
        // cleared during hydration. React won't render noscript tags on the client so if they
        // get cleared during hydration, the following render wont re-add them.
        // See https://github.com/facebook/react/issues/11423#issuecomment-341751071 or
        // https://github.com/bbc/simorgh/pull/1872 for more infomation.
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

      it('should have an inline link', () => {
        cy.window().then(win => {
          if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
            getElement('main a');
          }
        });
      });

      // it('should have a working first inline link', () => {
      //   clickInlineLinkAndTestPageHasHTML(
      //     'main a',
      //     `/news/articles/${services.news.pageTypes.articles.asset}`,
      //   );
      // });

      // This test is commented out because we are unable to run it on TEST as it requires a cert in order to work.
    });
  });
