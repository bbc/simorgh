import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import { config } from '../../support';

Object.keys(config.services).forEach(index => {
  const serviceConfig = config.services[index];
  const service = index;

  // NB need to PREVENT not handle redirect
  // Attempt to handle redirects this doesn't work, the replace seems to do nothing but the set to null is successful
  // Fails in envs with redirects
  // if (Cypress.env('APP_ENV') !== 'local') {
  //   // Cypress.env('UK') === true &&
  //   if (service !== 'news') {
  //     // Cypress.config('baseUrl', null);
  //     const oldBaseUrl = Cypress.config('baseUrl');
  //     const newBaseUrl = oldBaseUrl.replace('.co.uk', '.com');
  //     // Cypress.config('baseUrl', newBaseUrl);
  //     Cypress.config().baseUrl = newBaseUrl;
  //   } else if (service === 'news') {
  //     // Cypress.config('baseUrl', null);
  //     const oldBaseUrl = Cypress.config('baseUrl');
  //     const newBaseUrl = oldBaseUrl.replace('.com', '.co.uk');
  //     // Cypress.config('baseUrl', newBaseUrl);
  //     Cypress.config().baseUrl = newBaseUrl;
  //   }
  // }

  describe(`Article Tests for ${service}`, () => {
    if (
      serviceConfig.pageTypes.articles !== undefined &&
      serviceConfig.pageTypes.articles.basicAsset !== undefined
    ) {
      // can refactor to use the visit below for increased speed?
      it(`should return a 200 status code and HTML file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.pageTypes.articles.basicAsset}`,
          200,
          'text/html',
        );
      });

      if (serviceConfig.pageTypes.articles.featureFlags.dataEndpoint === true) {
        it(`should have an available data endpoint (200 response with a JSON file) for ${service}`, () => {
          cy.testResponseCodeAndType(
            `${serviceConfig.pageTypes.articles.basicAsset}.json`,
            200,
            'application/json',
          );
        });
      }

      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(`${serviceConfig.pageTypes.articles.basicAsset}`);
      });

      if (serviceConfig.pageTypes.articles.featureFlags.header === true) {
        it(`should render the header's BBC News branding for ${service}`, () => {
          cy.headerTestBBCNewsString();
        });

        it(`should have a visible banner for ${service}`, () => {
          cy.headerTestVisibleBanner(serviceConfig.canonical);
        });

        it(`should have and h1 for ${service}`, () => {
          cy.headerTestHaveH1();
        });
      }

      it(`should render an H1, which contains/displays a styled headline for ${service}`, () => {
        cy.firstHeadlineDataWindow();
      });

      it(`should render a paragraph, which contains/displays styled text for ${service}`, () => {
        cy.firstParagraphDataWindow();
      });

      it(`should have a placeholder image for ${service}`, () => {
        cy.get('figure div')
          .eq(0)
          .should(
            'have.css',
            'background-image',
            `url("data:image/svg+xml;base64,${BBC_BLOCKS}")`,
          );
      });

      it(`should have a visible image without a caption, and also not be lazyloaded for ${service}`, () => {
        cy.get('figure')
          .eq(0)
          .should('be.visible')
          .should('to.have.descendants', 'img')
          .should('not.to.have.descendants', 'figcaption')
          .within(() => cy.get('noscript').should('not.exist'));
      });

      it(`should have a visible image with a caption that is lazyloaded and has a noscript fallback image for ${service}`, () => {
        // pre-scrolled into view
        cy.get('figure')
          .eq(2)
          .within(() => {
            cy.get('div div').should('have.class', 'lazyload-placeholder');
          });

        // scroll into view
        cy.get('figure')
          .eq(2)
          .scrollIntoView();

        // once scrolled into view
        cy.get('figure')
          .eq(2)
          .scrollIntoView()
          .should('be.visible')
          .should('to.have.descendants', 'img')
          .should('to.have.descendants', 'figcaption')
          .within(() => {
            cy.get('noscript').contains('<img ');
            cy.get('div div').should('not.have.class', 'lazyload-placeholder');
          });
      });

      if (serviceConfig.pageTypes.articles.featureFlags.footer === true) {
        it(`should render the footers's BBC News branding for ${service}`, () => {
          cy.footerTestBranding(serviceConfig.canonical);
        });

        it(`should have working links for ${service} in the footer`, () => {
          cy.footerTestWorkingLinks();
        });

        it(`should contain copyright text with a link in it for ${service} in the footer`, () => {
          cy.footerTestCopyrightLink();
        });
      }

      it(`should have an image copyright label with styling for ${service}`, () => {
        cy.copyrightDataWindow();
      });

      it(`should render a title for ${service}`, () => {
        cy.window().then(win => {
          const { seoHeadline } = win.SIMORGH_DATA.pageData.promo.headlines;
          cy.title().should(
            'eq',
            `${seoHeadline}${serviceConfig.meta.titleSuffix}`,
          );
        });
      });

      it(`should have script to fetch bundle for ${service}`, () => {
        cy.hasScriptToFetchBundle();
      });

      // HACK as these are only on news and seems not worth having feature flag
      if (service === 'news') {
        it(`should have an inline link for ${service}`, () => {
          cy.get('main a');
        });

        it(`should render a formatted timestamp for ${service}`, () => {
          cy.window().then(win => {
            const { lastPublished } = win.SIMORGH_DATA.pageData.metadata;
            const timeStamp = Cypress.moment(lastPublished).format(
              'D MMMM YYYY',
            );
            cy.get('time').should('contain', timeStamp);
          });
        });

        it(`should render an H2, which contains/displays a styled subheading for ${service}`, () => {
          // TODO refactor to remove the consts
          const getBlockByType = (blocks, blockType) => {
            let blockData;

            blocks.forEach(block => {
              if (!blockData && block.type === blockType) {
                blockData = block;
              }
            });
            return blockData;
          };

          const getBlockData = (blockType, win) => {
            const { blocks } = win.SIMORGH_DATA.pageData.content.model;

            return getBlockByType(blocks, blockType);
          };

          const shouldMatchReturnedData = (data, element) => {
            cy.get(element).should('contain', data);
          };

          cy.window().then(win => {
            const subheadingData = getBlockData('subheadline', win);
            const {
              text,
            } = subheadingData.model.blocks[0].model.blocks[0].model;

            shouldMatchReturnedData(text, 'h2');
          });
        });

        // This test is fixed to local because we are unable to run it on TEST as it requires a cert in order to work.
        if (Cypress.env('APP_ENV') === 'local') {
          it(`should have a working first inline link for ${service}`, () => {
            cy.get('main a').click(); // Order of tests in this file matter because this click goes to a different article, so is last.
            cy.url().should('contain', '/news/articles/c0g992jmmkko');
            cy.get('header a').should('contain', 'BBC News');
          });
        }
      }
    }
  });
});
