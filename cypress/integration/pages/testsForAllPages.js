import config from '../../support/config/services';
import envConfig from '../../support/config/envs';
import appConfig from '../../../src/server/utilities/serviceConfigs';
import getBrandedImage from '../../support/helpers/getBrandedImage';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllPages = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigforAllPages = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Running testsForAllPages for ${service} ${pageType}`, () => {
    describe(`Metadata`, () => {
      it('should have resource hints', () => {
        const resources = [envConfig.assetOrigin, 'https://ichef.bbci.co.uk'];
        const serviceConfig = appConfig[config[service].name];
        const { fonts } = serviceConfig[variant || 'default'];
        if (fonts && fonts.length > 0) {
          resources.push(
            'https://gel.files.bbci.co.uk',
            'https://ws-downloads.files.bbci.co.uk',
          );
        }

        resources.forEach(resource => {
          const selector = `head link[href="${resource}"]`;
          cy.get(selector).should('have.attr', 'rel', 'preconnect');
          cy.get(selector).eq(1).should('have.attr', 'rel', 'dns-prefetch');
        });
      });

      it('should render a H1 which has attributes `id` and `tabindex`', () => {
        cy.get('h1')
          .should('have.lengthOf', 1)
          .should('have.attr', 'id', 'content')
          .should('have.attr', 'tabindex', '-1');
      });

      if (pageType !== 'errorPage404') {
        it('should include the canonical URL', () => {
          cy.get('head link[rel="canonical"]').should(
            'have.attr',
            'href',
            `${envConfig.baseUrl}${Cypress.env('currentPath')}`,
          );
        });

        it('should have a correct robot meta tag', () => {
          cy.get('head meta[name="robots"]').should(
            'have.attr',
            'content',
            'noodp,noydir',
          );
        });
        if (pageType !== 'mostReadPage') {
          it('should have lang attribute matching payload data', () => {
            cy.request(`${Cypress.env('currentPath')}.json`).then(
              ({ body }) => {
                const lang =
                  pageType === 'articles'
                    ? body.metadata.passport.language
                    : body.metadata.language;

                cy.get('html').should('have.attr', 'lang', lang);
              },
            );
          });

          it('should have the correct shared metadata', () => {
            cy.request(`${Cypress.env('currentPath')}.json`).then(
              ({ body }) => {
                const mediaAssetPageType = 'mediaAssetPage';
                const articlesPageType = 'articles';
                const photoGalleryPageType = 'photoGalleryPage';
                const storyPageType = 'storyPage';

                const cpsPageTypes = [
                  mediaAssetPageType,
                  photoGalleryPageType,
                  storyPageType,
                ];

                const { indexImage } = body.promo;
                const imagePath = indexImage ? indexImage.path : null;

                const imageAltText =
                  indexImage &&
                  cpsPageTypes.includes(pageType) &&
                  indexImage.altText
                    ? indexImage.altText
                    : appConfig[config[service].name][variant]
                        .defaultImageAltText;

                const imageSrc =
                  imagePath && cpsPageTypes.includes(pageType)
                    ? getBrandedImage({
                        imagePath,
                        serviceName: config[service].name,
                      })
                    : appConfig[config[service].name][variant].defaultImage;

                const ogType = [
                  articlesPageType,
                  mediaAssetPageType,
                  photoGalleryPageType,
                  storyPageType,
                ].includes(pageType)
                  ? 'article'
                  : 'website';

                cy.get('head').within(() => {
                  cy.get('meta[property="fb:admins"]').should(
                    'have.attr',
                    'content',
                    '100004154058350',
                  );
                  cy.get('meta[property="fb:app_id"]').should(
                    'have.attr',
                    'content',
                    '1609039196070050',
                  );
                  cy.get('meta[property="og:image"]').should(
                    'have.attr',
                    'content',
                    imageSrc,
                  );
                  cy.get('meta[property="og:image:alt"]').should(
                    'have.attr',
                    'content',
                    imageAltText,
                  );
                  cy.get('meta[property="og:locale"]').should(
                    'have.attr',
                    'content',
                    appConfig[config[service].name][variant].locale,
                  );
                  cy.get('meta[property="og:type"]').should(
                    'have.attr',
                    'content',
                    ogType,
                  );
                  cy.get('meta[property="og:url"]').should(
                    'have.attr',
                    'content',
                    `${envConfig.baseUrl}${Cypress.env('currentPath')}`,
                  );
                  cy.get('meta[property="og:site_name"]').should(
                    'have.attr',
                    'content',
                    appConfig[config[service].name][variant].brandName,
                  );
                  cy.get('meta[name="twitter:card"]').should(
                    'have.attr',
                    'content',
                    'summary_large_image',
                  );
                  cy.get('meta[name="twitter:creator"]').should(
                    'have.attr',
                    'content',
                    appConfig[config[service].name][variant].twitterCreator,
                  );
                  cy.get('meta[name="twitter:image:alt"]').should(
                    'have.attr',
                    'content',
                    imageAltText,
                  );
                  cy.get('meta[name="twitter:image:src"]').should(
                    'have.attr',
                    'content',
                    imageSrc,
                  );
                  cy.get('meta[name="twitter:site"]').should(
                    'have.attr',
                    'content',
                    appConfig[config[service].name][variant].twitterSite,
                  );
                  cy.get('link[rel="apple-touch-icon"]').each(link => {
                    const url = link.attr('href');
                    cy.request({
                      url,
                      failOnStatusCode: false,
                    }).then(resp => {
                      expect(resp.status).to.equal(200);
                    });
                  });
                });
              },
            );
          });

          it('should have correct title & description metadata', () => {
            /*
             * Naidheachdan needs to have correct metadata added to all environments.
             * afaanoromoo & tigrinya need correct metadata on TEST env
             * These conditions will be removed in issue https://github.com/bbc/simorgh-infrastructure/issues/679
             */
            if (
              service !== 'naidheachdan' &&
              !(
                service === 'afaanoromoo' && Cypress.env('APP_ENV') === 'test'
              ) &&
              !(service === 'tigrinya' && Cypress.env('APP_ENV') === 'test')
            ) {
              cy.request(`${Cypress.env('currentPath')}.json`).then(
                ({ body }) => {
                  let description;
                  let title;
                  switch (pageType) {
                    case 'articles':
                      description =
                        (typeof body.promo.summary === 'string'
                          ? body.promo.summary
                          : body.promo.summary.blocks[0].model.blocks[0].model
                              .blocks[0].model.text) ||
                        body.promo.headlines.seoHeadline;
                      title = body.promo.headlines.seoHeadline;
                      break;
                    case 'frontPage':
                      description = body.metadata.summary;
                      title =
                        appConfig[config[service].name][variant].frontPageTitle;
                      break;
                    case 'liveRadio':
                      description = body.promo.summary;
                      title = body.promo.name;
                      break;
                    case 'mediaAssetPage':
                      description = body.promo.summary;
                      title = body.promo.headlines.headline;
                      break;
                    case 'photoGalleryPage':
                      description = body.promo.summary;
                      title = body.promo.headlines.headline;
                      break;
                    case 'storyPage':
                      description = body.promo.summary;
                      title = body.promo.headlines.headline;
                      break;
                    case 'idxPage':
                      description = body.metadata.summary;
                      title = body.metadata.title;
                      break;
                    default:
                      description = '';
                      title = '';
                  }
                  /* Note that if updating these, also do the same for errorPage404/tests.js */
                  const pageTitle = `${title} - ${
                    appConfig[config[service].name][variant].brandName
                  }`;

                  cy.get('head').within(() => {
                    cy.title().should('eq', pageTitle.replace(/ +/g, ' '));
                    cy.get('meta[property="og:description"]').should(
                      'have.attr',
                      'content',
                      description,
                    );
                    cy.get('meta[property="og:title"]').should(
                      'have.attr',
                      'content',
                      pageTitle,
                    );
                    cy.get('meta[name="twitter:description"]').should(
                      'have.attr',
                      'content',
                      description,
                    );
                    cy.get('meta[name="twitter:title"]').should(
                      'have.attr',
                      'content',
                      pageTitle,
                    );
                  });
                },
              );
            }
          });
        }
      }
      /* End of block (pageType !== 'errorPage404') */

      it('should have dir matching service config', () => {
        cy.get('html').and(
          'have.attr',
          'dir',
          appConfig[config[service].name][variant].dir,
        );
      });
    });

    describe('Header Tests', () => {
      const serviceName = config[service].name;
      // limit number of tests to 2 services for navigation toggling
      const testMobileNav =
        serviceName === 'ukchina' || serviceName === 'persian';

      if (testMobileNav) {
        it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {
          cy.viewport(320, 480);
          cy.get('nav')
            .find('div[class^="StyledScrollableNav"]')
            .should('be.visible');

          cy.get('nav')
            .find('ul[class^="DropdownUl"]')
            .should('not.be.visible');

          cy.get('nav button').click();

          cy.get('nav')
            .find('div[class^="StyledScrollableNav"]')
            .should('not.be.visible');

          cy.get('nav').find('ul[class^="DropdownUl"]').should('be.visible');
        });
      }
    });

    if (
      ['mediaAssetPage', 'photoGalleryPage', 'storyPage'].includes(pageType)
    ) {
      describe('Photo Gallery, Story Page and MAP Tests', () => {
        it('should render a timestamp', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            if (body.metadata.options.allowDateStamp) {
              cy.get('time')
                .eq(0)
                .should('be.visible')
                .should('have.attr', 'datetime')
                .should('not.be.empty');
            } else {
              cy.log('Test skipped - allowDateStamp false within metadata');
            }
          });
        });
        if (['photoGalleryPage', 'storyPage'].includes(pageType)) {
          it('should render a H1, which displays the headline', () => {
            cy.request(`${Cypress.env('currentPath')}.json`).then(
              ({ body }) => {
                cy.get('h1').should('contain', body.promo.headlines.headline);
              },
            );
          });
        }
      });
    }
    // End of block (['mediaAssetPage', 'photoGalleryPage', 'storyPage'].includes(pageType))
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllPageTypes = ({
  service,
  pageType,
}) => {
  describe(`Running testsToNeverSmokeTestForAllPageTypes for ${service} ${pageType}`, () => {});
};
