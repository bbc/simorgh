import config from '../../support/config/services';
import envConfig from '../../support/config/envs';
import appConfig from '../../../src/server/utilities/serviceConfigs';
import useAppToggles from '../../support/helpers/useAppToggles';

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

        resources.forEach((resource) => {
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

        it('should have lang attribute matching payload data', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const lang =
              pageType === 'articles'
                ? body.metadata.passport.language
                : body.metadata.language;

            cy.get('html').should('have.attr', 'lang', lang);
          });
        });

        it('should have the correct shared metadata', () => {
          cy.get('link[rel="apple-touch-icon"]').each((link) => {
            const url = link.attr('href');
            cy.request({
              url,
              failOnStatusCode: false,
            }).then((resp) => {
              expect(resp.status).to.equal(200);
            });
          });
        });
        /* End of block (pageType !== 'errorPage404') */

        it('should have dir matching service config', () => {
          cy.get('html').and(
            'have.attr',
            'dir',
            appConfig[config[service].name][variant].dir,
          );
        });

        describe('Header Tests', () => {
          const hasLocalisedName =
            appConfig[config[service].name][variant].serviceLocalizedName !==
            undefined;

          it('should render the BBC News branding', () => {
            cy.get('header a').should(
              'contain',
              hasLocalisedName
                ? `${appConfig[config[service].name][variant].product}, ${
                    appConfig[config[service].name][variant]
                      .serviceLocalizedName
                  }`
                : appConfig[config[service].name][variant].product,
            );
          });

          if (hasLocalisedName) {
            it("should have offscreen text with product's language code set to English", () => {
              cy.get(
                'header div[class^="Banner"] span[class^="VisuallyHiddenText"] span',
              ).should('have.attr', 'lang', 'en-GB');
            });

            it('should not set the language code for localised name', () => {
              cy.get(
                'header div[class^="Banner"] span[class^="VisuallyHiddenText"]',
              )
                .eq(0)
                .should('not.have.attr', 'lang', 'en-GB');
            });
          } else {
            it('should not have a language attribute if no serviceLocalizedName set', () => {
              cy.get(
                'header div[class^="Banner"] span[class^="VisuallyHiddenText"]',
              ).should('not.have.attr', 'lang', 'en-GB');
            });
          }

          it('should have a visible banner, with a skip to content link', () => {
            cy.get('header')
              .should('have.lengthOf', 1)
              .find('div[class^="Banner"]')
              .children()
              .should('have.lengthOf', 1)
              .children()
              .should('have.attr', 'href', `/${config[service].name}`)
              .find('svg')
              .should('be.visible');
            cy.get('div[class^="Banner"]')
              .find('a[class^="SkipLink"]')
              .should('have.attr', 'href', '#content');
          });

          if (appConfig[config[service].name][variant].navigation) {
            if (
              pageType !== 'articles' ||
              (pageType === 'articles' && useAppToggles.navOnArticles.enabled)
            ) {
              it('should have one visible navigation', () => {
                cy.get('nav')
                  .should('have.lengthOf', 1)
                  .should('be.visible')
                  .find('a[class^="StyledLink"]')
                  .should(
                    'have.attr',
                    'href',
                    appConfig[config[service].name][variant].navigation[0].url,
                  )
                  .should(
                    'contain',
                    appConfig[config[service].name][variant].navigation[0]
                      .title,
                  );
              });

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

                  cy.get('nav')
                    .find('ul[class^="DropdownUl"]')
                    .should('be.visible');
                });
              }
            }
          }
        });

        describe('Footer Tests', () => {
          describe('footer tests', () => {
            it('should have a visible footer', () => {
              cy.get('footer')
                .should('have.length', 1)
                .should('have.attr', 'role', 'contentinfo')
                .find('a')
                .should('have.attr', 'href', `/${config[service].name}`)
                .find('svg')
                .should('be.visible');
            });
          });

          it('should render the BBC branding', () => {
            cy.get('footer a')
              .eq(0)
              .should(
                'contain',
                appConfig[config[service].name][variant]
                  .serviceLocalizedName !== undefined
                  ? `${appConfig[config[service].name][variant].product}, ${
                      appConfig[config[service].name][variant]
                        .serviceLocalizedName
                    }`
                  : appConfig[config[service].name][variant].product,
              );
          });
        });
        if (
          ['mediaAssetPage', 'photoGalleryPage', 'storyPage'].includes(pageType)
        ) {
          describe('Photo Gallery, Story Page and MAP Tests', () => {
            it('should render a timestamp', () => {
              cy.request(`${Cypress.env('currentPath')}.json`).then(
                ({ body }) => {
                  if (body.metadata.options.allowDateStamp) {
                    cy.get('time')
                      .eq(0)
                      .should('be.visible')
                      .should('have.attr', 'datetime')
                      .should('not.be.empty');
                  } else {
                    cy.log(
                      'Test skipped - allowDateStamp false within metadata',
                    );
                  }
                },
              );
            });

            it('should render a H1, which displays the headline', () => {
              cy.request(`${Cypress.env('currentPath')}.json`).then(
                ({ body }) => {
                  cy.get('h1').should('contain', body.promo.headlines.headline);
                },
              );
            });
          });
        }
      }
      // End of block (['mediaAssetPage', 'photoGalleryPage', 'storyPage'].includes(pageType))
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllPageTypes = ({
  service,
  pageType,
}) => {
  describe(`Running testsToNeverSmokeTestForAllPageTypes for ${service} ${pageType}`, () => {});
};
