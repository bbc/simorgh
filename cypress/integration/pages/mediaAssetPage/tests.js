// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('MAP Body', () => {
      describe('Header', () => {
        it('should have a root div', () => {
          cy.get('div').should('have.attr', 'id', 'root');
        });

        it('should have header', () => {
          cy.get('header')
            .should('have.length', 1)
            .should('have.attr', 'role', 'banner');
        });

        it(`should the header contains the brand of the ${service}`, () => {
          cy.get('header')
            .find('div')
            .should('have.attr', 'class');
        });

        it('should have nav element with role navigation', () => {
          cy.get('header')
            .find('nav')
            .should('have.attr', 'role', 'navigation')
            .should('be.visible');
        });

        it('should have element visible navigation', () => {
          cy.get('nav')
            .should('have.lengthOf', 1)
            .should('be.visible')
            .find('a[class^="StyledNav"]')
            .should('have.lengthOf', 1)
            .should('have.attr', 'href', '#content');
        });
      });

      it('should have navigation with ul not empty', () => {
        cy.get('nav ul')
          .find('li')
          .its('length')
          .should('be.gt', 1);
      });
      describe('Main', () => {
        it('should have main section with role main', () => {
          cy.get('main')
            .should('have.length', 1)
            .should('have.attr', 'role', 'main');
        });
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
