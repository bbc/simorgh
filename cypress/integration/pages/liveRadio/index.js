import config from '../../../support/config/services';
import appConfig from '../../../../src/app/lib/config/services';
import envConfig from '../../../support/config/envs';
import runTestsForPage from '../../../support/helpers/runTestsForPage';

const serviceIsNotGNL = service => service !== 'japanese';

const runCommonTests = ({ service }) =>
  describe('Common tests', () => {
    describe('Live Radio body', () => {
      it('should render a H1, which contains/displays a styled headline', () => {
        cy.request(`${config[service].pageTypes.liveRadio.path}.json`).then(
          ({ body }) => {
            const [{ text: headline }] = body.content.blocks;
            cy.get('h1').should('contain', headline);
          },
        );
      });

      it('should render an H2, which contains/displays a styled subheading', () => {
        cy.request(`${config[service].pageTypes.liveRadio.path}.json`).then(
          ({ body }) => {
            if (body.metadata.language === 'en-gb') {
              const { subheadline } = body.content.blocks[1];
              cy.get('h2').should('contain', subheadline);
            }
          },
        );
      });

      it('should render a title', () => {
        cy.request(`${config[service].pageTypes.liveRadio.path}.json`).then(
          ({ body }) => {
            const { name } = body.promo;
            cy.title().should(
              'eq',
              `${name} - ${appConfig[service].brandName}`,
            );
          },
        );
      });
    });

    // will be addressed by https://github.com/bbc/simorgh/issues/2750
    describe('Metadata', () => {
      it.skip('should have the correct facebook metadata', () => {
        cy.checkFacebookMetadata(
          '100004154058350',
          '1609039196070050',
          `${appConfig[service].articleAuthor}`,
        );
      });

      it.skip('should have the correct open graph metadata', () => {
        cy.checkOpenGraphMetadata(
          'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
          `${appConfig[service].defaultImage}`,
          `${appConfig[service].defaultImageAltText}`,
          `${appConfig[service].locale}`,
          `${appConfig[service].defaultImageAltText}`,
          "Meghan's bouquet laid on tomb of unknown warrior",
          'article',
          `https://www.bbc.com${config[service].pageTypes.liveRadio.path}`,
        );
      });

      it.skip('should have the correct twitter metadata', () => {
        cy.checkTwitterMetadata(
          'summary_large_image',
          `${appConfig[service].twitterCreator}`,
          'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
          `${appConfig[service].defaultImageAltText}`,
          `${appConfig[service].defaultImage}`,
          `${appConfig[service].twitterSite}`,
          "Meghan's bouquet laid on tomb of unknown warrior",
        );
      });

      it.skip('should include metadata that matches the JSON data', () => {
        cy.request().then(({ body }) => {
          cy.get('head').within(() => {
            cy.get('meta[name="description"]').should(
              'have.attr',
              'content',
              body.pageData.promo.summary || body.pageData.promo.name,
            );
            cy.get('meta[name="og:title"]').should(
              'have.attr',
              'content',
              body.pageData.promo.name,
            );
            cy.get('meta[name="og:type"]').should(
              'have.attr',
              'content',
              body.pageData.metadata.type,
            );
          });
        });
      });

      // will be addressed by this https://github.com/bbc/simorgh/issues/3117
      it.skip('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'headline');
      });
    });
  });

const runCanonicalTests = ({ service }) =>
  describe('Canonical Tests', () => {
    // will be addressed by https://github.com/bbc/simorgh/issues/3324
    describe('ATI', () => {
      it.skip('should have a noscript tag with an 1px image with the ati url', () => {
        if (serviceIsNotGNL) {
          cy.hasNoscriptImgAtiUrl(
            envConfig.atiUrl,
            config[service].isWorldService
              ? envConfig.atiAnalyticsWSBucket
              : '',
          );
        } else {
          cy.hasNoscriptImgAtiUrl(
            envConfig.atiUrl,
            envConfig.atiAnalyticsGNLBucket,
          );
        }
      });
    });

    // TODO Chartbeat not yet implemented
    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it.skip('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it.skip('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });

const runAmpTests = ({ service }) =>
  describe('Amp Tests', () => {
    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${config[service].pageTypes.liveRadio.path}.amp`,
          200,
          'text/html',
        );
      });
    });

    describe('ATI', () => {
      it.skip('should have an amp-analytics tag with the ati url', () => {
        if (serviceIsNotGNL) {
          cy.hasAmpAnalyticsAtiUrl(
            envConfig.atiUrl,
            config[service].isWorldService
              ? envConfig.atiAnalyticsWSBucket
              : '',
          );
        } else {
          cy.hasAmpAnalyticsAtiUrl(
            envConfig.atiUrl,
            envConfig.atiAnalyticsGNLBucket,
          );
        }
      });
    });

    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it.skip('should have chartbeat config UID', () => {
          cy.hasAmpChartbeatConfigUid();
        });
      }
    });

    it('should have AMP attribute', () => {
      cy.get('html').should('have.attr', 'amp');
    });

    // TODO - Refactor or review this. Can it be a puppeteer test?
    it('should load the AMP framework', () => {
      // .eq(2) gets the amp <script> as:
      // the first loaded is a Cypress <script>
      // the second loaded is the Schema.org metadata script
      cy.get('head script')
        .eq(2)
        .should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');

      cy.get('head script')
        .eq(3)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
        );

      cy.get('head script')
        .eq(4)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
        );

      cy.get('head script')
        .eq(5)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
        );
    });

    it('should load the AMP body scripts', () => {
      cy.get('body script')
        .eq(0)
        .should('have.attr', 'type', 'application/json');
      cy.get('body script')
        .eq(1)
        .should('have.attr', 'type', 'application/json');
    });

    it('should have any correct amp scripts in the body and the head', () => {
      cy.get('body script')
        .its('length')
        .should('be', 2); // 1 for amp-geo + 1 for amp-consent
      cy.get('head script')
        .its('length')
        .should('be', 5); // 1 for amp.js + 1 for amp-geo + 1 for amp-consent + 1 for amp-analytics + 1 that Cypress injects into the head
    });
  });

runTestsForPage('liveRadio', runCommonTests, runCanonicalTests, runAmpTests);
