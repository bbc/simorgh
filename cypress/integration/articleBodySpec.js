import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import config from '../support/config/services';

Object.keys(config)
  .filter(service => config[service].pageTypes.articles !== undefined)
  .forEach(service => {
    describe(`${service} Article Body Tests`, () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(
          `/${service}/articles/${config[service].pageTypes.articles.asset}`,
        );
      });

      it('should render a H1, which contains/displays a styled headline', () => {
        cy.firstHeadlineDataWindow();
      });

      it('should render a formatted timestamp', () => {
        cy.window().then(win => {
          if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
            cy.get('time').should(
              'contain',
              Cypress.moment(
                win.SIMORGH_DATA.pageData.metadata.lastPublished,
              ).format('D MMMM YYYY'),
            );
          }
        });
      });

      it('should render an H2, which contains/displays a styled subheading', () => {
        cy.window().then(win => {
          if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
            cy.firstSubheadlineDataWindow();
          }
        });
      });

      it('should render a paragraph, which contains/displays styled text', () => {
        cy.firstParagraphDataWindow();
      });

      it('should have a placeholder image', () => {
        cy.get('figure div div div')
          .eq(0)
          .should(el => {
            expect(el).to.have.css(
              'background-image',
              `url("data:image/svg+xml;base64,${BBC_BLOCKS}")`,
            );
          });
      });

      it('should have a visible image without a caption, and also not be lazyloaded', () => {
        cy.get('figure')
          .eq(0)
          .should('be.visible')
          .should('to.have.descendants', 'img')
          .should('not.to.have.descendants', 'figcaption')
          .within(() => cy.get('noscript').should('not.exist'));
      });

      it('should have a visible image with a caption that is lazyloaded and has a noscript fallback image', () => {
        cy.get('figure')
          .eq(2)
          .within(() => {
            cy.get('div div div div').should(
              'have.class',
              'lazyload-placeholder',
            );
          })
          .scrollIntoView();

        cy.get('figure')
          .eq(2)
          .should('be.visible')
          .should('to.have.descendants', 'img')
          .should('to.have.descendants', 'figcaption')

          // NB: If this test starts failing unexpectedly it's a good sign that the dom is being
          // cleared during hydration. React won't render noscript tags on the client so if they
          // get cleared during hydration, the following render wont re-add them.
          // See https://github.com/facebook/react/issues/11423#issuecomment-341751071 or
          // https://github.com/bbc/simorgh/pull/1872 for more infomation.
          .within(() => {
            cy.get('noscript').contains('<img ');
            cy.get('div div').should('not.have.class', 'lazyload-placeholder');
          });
      });

      it('should have an image copyright label with styling', () => {
        cy.copyrightDataWindow();
      });

      it('should render a title', () => {
        cy.window().then(win => {
          if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
            cy.renderedTitle(
              `${win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline} - BBC News`,
            );
          } else {
            cy.renderedTitle(
              `${win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline} - BBC News فارسی`,
            );
          }
        });
      });

      it('should have an inline link', () => {
        cy.window().then(win => {
          if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
            cy.get('main a');
          }
        });
      });

      // it('should have a working first inline link', () => {
      //   cy.get('main a').click();
      //   cy.url().should(
      //     'contain',
      //     `/news/articles/${config.news.pageTypes.articles.asset}`,
      //   );
      //   cy.get('header a').should('contain', 'BBC News');
      // });

      // This test is commented out because we are unable to run it on TEST as it requires a cert in order to work.
    });
  });
