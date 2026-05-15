import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import getAppEnv from '#cypress/support/helpers/getAppEnv';
import envConfig, { EnvironmentConfigType } from '../support/config/envs';
import config from '../support/config/services';
import { ServiceParametersType } from '../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType }: ServiceParametersType) => {
  if (pageType && pageType !== 'errorPage404') {
    describe(`Running testsForAllCanonicalPages for ${service} ${pageType}`, () => {
      if (Cypress.env('SMOKE')) {
        describe(
          'ATI',
          {
            retries: 3,
          },
          () => {
            it('should have a noscript img tag with the ati url', () => {
              cy.hasNoscriptImgAtiUrl(
                (envConfig as EnvironmentConfigType).atiUrl,
              );
            });
          },
        );
      }
    });
  }

  describe('Header Tests', () => {
    const serviceName = config[service]?.name || service;

    const twoTierNavServices = {
      local: null, // Don't test two tier nav locally as the local environment can't fetch config
      test: ['arabic', 'tamil'], // Test env isn't guaranteed to have the new nav config, so only run tests for services we know have it
      live: SERVICES_WITH_NEW_NAV,
    };

    const cypressAppEnv = getAppEnv();

    const testTwoTierNav =
      twoTierNavServices[cypressAppEnv]?.includes(serviceName) ?? false;

    let initialSecondaryNavItemLinkTexts: string[] = [];

    if (testTwoTierNav) {
      it('should show two tier navigation on desktop', () => {
        cy.viewport(1008, 900);
        cy.get('[data-e2e="scrollable-nav"]').should('be.visible');
        cy.get('[data-e2e="scrollable-nav-secondary"] ul').should('be.visible');
        cy.get('[data-e2e="scrollable-nav"] a').each($el => {
          cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
        });
        cy.get('[data-e2e="scrollable-nav-secondary"] ul a').each($el => {
          cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
        });
      });

      it('should show two tier navigation on mobile', () => {
        cy.viewport(320, 480);
        cy.get('[data-e2e="scrollable-nav"]').should('be.visible');
        cy.get('[data-e2e="scrollable-nav-secondary"] ul').should('be.visible');
        cy.get('[data-e2e="scrollable-nav"] a').each($el => {
          cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
        });
        cy.get('[data-e2e="scrollable-nav-secondary"] ul a').each($el => {
          cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
        });
      });

      it('dropdown menu should open and close when the menu button is clicked', () => {
        cy.viewport(320, 480);
        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('be.visible');
        cy.get('nav')
          .find('[data-e2e="dropdown-nav"] ul')
          .should('not.be.visible');
        cy.get('nav button').click({ force: true });
        cy.get('nav').find('[data-e2e="dropdown-nav"] ul').should('be.visible');
        cy.get('nav button').click({ force: true });
        cy.get('nav')
          .find('[data-e2e="dropdown-nav"] ul')
          .should('not.be.visible');
      });
      // run a fuller set of nav tests on the home page
      if (pageType === 'home') {
        before(() => {
          cy.get('[data-e2e="scrollable-nav-secondary"] li a').then($links => {
            initialSecondaryNavItemLinkTexts = $links
              .toArray()
              .map(link => link.textContent || '');
          });
        });

        it('should stay on the same page when brand link is clicked', () => {
          cy.location('pathname').then(currentPath => {
            cy.get('a#topPage').click();
            cy.location('pathname').should('eq', currentPath);
          });
        });

        it('navigates to a new page and secondary nav changes when clicking a non-home item in top nav', function test() {
          cy.get('[data-e2e="scrollable-nav"] li').then($items => {
            if ($items.length < 2) {
              this.skip();
            }
            cy.location('pathname').then(previousUrl => {
              cy.wrap($items).eq(1).find('a').click();
              cy.location('pathname').should('not.eq', previousUrl);
              cy.get('[data-e2e="scrollable-nav-secondary"] li a').then(
                $links => {
                  const newTexts = $links
                    .toArray()
                    .map(link => link.textContent || '');
                  expect(newTexts).to.not.deep.equal(
                    initialSecondaryNavItemLinkTexts,
                  );
                },
              );
            });
          });
        });

        it('clicking 1st item in top nav navigates to the home page and secondary scrollable nav has corresponding items', () => {
          cy.get('[data-e2e="scrollable-nav"] li').eq(0).find('a').click();
          cy.location('pathname').should('include', `/${service}`);
          cy.get('[data-e2e="scrollable-nav-secondary"] li a').then($links => {
            const resetTexts = $links
              .toArray()
              .map(link => link.textContent || '');
            expect(resetTexts).to.deep.equal(initialSecondaryNavItemLinkTexts);
          });
        });
      }
    }
  });
};
