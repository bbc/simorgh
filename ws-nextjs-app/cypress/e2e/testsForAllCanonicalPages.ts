/* eslint-disable import/prefer-default-export */
import SERVICES_WITH_NEW_NAV from '#src/app/components/Navigation/config';
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
    // limit number of tests to 2 services for navigation toggling
    const testMobileNav =
      serviceName === 'ukchina' || serviceName === 'persian';

    const testTwoTierNav = SERVICES_WITH_NEW_NAV.includes(service);

    let initialUrl = '';
    let initialSecondaryNavTexts: string[] = [];

    before(() => {
      cy.location('pathname').then(path => {
        initialUrl = path;
      });
      cy.get('[data-e2e="scrollable-nav-secondary"] li a').then($links => {
        initialSecondaryNavTexts = $links
          .toArray()
          .map(link => link.textContent || '');
      });
    });

    if (testMobileNav) {
      it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {
        cy.viewport(320, 480);
        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('be.visible');

        cy.get('nav')
          .find('[data-e2e="dropdown-nav"] ul')
          .should('not.be.visible');

        cy.get('nav button').click();

        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('not.exist');

        cy.get('nav').find('[data-e2e="dropdown-nav"] ul').should('be.visible');
      });
    }

    // this check limits these tests to arabic and tamil services
    if (testTwoTierNav) {
      it('should show two tier navigation on desktop', () => {
        cy.viewport(1008, 900);
        cy.get('nav').within(() => {
          cy.get('[data-e2e="scrollable-nav"]').should('be.visible');
          cy.get('[data-e2e="scrollable-nav-secondary"] ul').should(
            'be.visible',
          );

          cy.get('[data-e2e="scrollable-nav"] a').each($el => {
            cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
          });
          cy.get('[data-e2e="scrollable-nav-secondary"] ul a').each($el => {
            cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
          });
        });
      });

      it('should show two tier navigation on mobile', () => {
        cy.viewport(320, 480);
        cy.get('nav').within(() => {
          cy.get('[data-e2e="scrollable-nav"]').should('be.visible');
          cy.get('[data-e2e="scrollable-nav-secondary"] ul').should(
            'be.visible',
          );

          cy.get('[data-e2e="scrollable-nav"] a').each($el => {
            cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
          });
          cy.get('[data-e2e="scrollable-nav-secondary"] ul a').each($el => {
            cy.wrap($el).should('have.attr', 'href').and('not.be.empty');
          });
        });
      });

      it('dropdown menu should open when the menu button is clicked', () => {
        cy.viewport(320, 480);
        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('be.visible');

        cy.get('nav')
          .find('[data-e2e="dropdown-nav"] ul')
          .should('not.be.visible');

        cy.get('nav button').click({ force: true });

        cy.get('nav').find('[data-e2e="dropdown-nav"] ul').should('be.visible');
      });

      it('should stay on the same page when brand link is clicked', () => {
        cy.location('pathname').then(currentPath => {
          cy.get('a#topPage').click();
          cy.location('pathname').should('eq', currentPath);
        });
      });

      it('navigates to new page and secondary nav changes when clicking 2nd item in top nav', () => {
        cy.get('[data-e2e="scrollable-nav"] li').eq(1).find('a').click();
        cy.location('pathname').should('not.eq', initialUrl);
        cy.get('[data-e2e="scrollable-nav-secondary"] li a').then($links => {
          const newTexts = $links.toArray().map(link => link.textContent || '');
          expect(newTexts).to.not.deep.equal(initialSecondaryNavTexts);
        });
      });

      it('navigates to another new page and secondary nav changes when clicking 3rd item in top nav', () => {
        cy.get('[data-e2e="scrollable-nav"] li').eq(2).find('a').click();
        cy.location('pathname').should('not.eq', initialUrl);
        cy.get('[data-e2e="scrollable-nav-secondary"] li a').then($links => {
          const newTexts = $links.toArray().map(link => link.textContent || '');
          expect(newTexts).to.not.deep.equal(initialSecondaryNavTexts);
        });
      });

      it('clicking 1st item in top nav navigates to the home page and secondary scrollable nav has corresponding items', () => {
        cy.get('[data-e2e="scrollable-nav"] li').eq(0).find('a').click();
        cy.location('pathname').should('eq', initialUrl);
        cy.get('[data-e2e="scrollable-nav-secondary"] li a').then($links => {
          const resetTexts = $links
            .toArray()
            .map(link => link.textContent || '');
          expect(resetTexts).to.deep.equal(initialSecondaryNavTexts);
        });
      });
    }
  });
};
