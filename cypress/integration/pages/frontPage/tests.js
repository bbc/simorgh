import snapshotConfig from '../../../support/helpers/snapshotConfig';

// Limiting to one service for now
const serviceHasPublishedPromo = service => service === 'arabic';

export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Frontpage body', () => {
      before(() => {
        cy.viewport(1008, 768);
      });

      describe('Section', () => {
        if (
          serviceHasPublishedPromo(service) &&
          Cypress.env('APP_ENV') === 'live'
        ) {
          it('individual promo should link to corresponding article pages and back navigation should link to frontpage', done => {
            // This is to catch an application error that keeps failing live E2Es
            // See issue #9138
            // We are waiting for a response from Google to find a fix
            // And in the meantime are stopping this error failing the tests
            // eslint-disable-next-line no-unused-vars
            cy.on('uncaught:exception', (err, runnable) => {
              expect(err.message).to.include('application');
              done();
              return false;
            });

            let currentURL = null;
            cy.get('h3')
              .eq(3)
              .within(() => {
                cy.get('a')
                  .should('have.attr', 'href')
                  .then(href => {
                    cy.request({
                      url: href,
                      failOnStatusCode: false,
                    }).then(resp => {
                      expect(resp.status).to.not.equal(404);
                    });
                  });
              });

            cy.url().then(url => {
              currentURL = url;
              cy.get('h3').eq(3).click();
              cy.go('back');
              cy.url().should('eq', currentURL);
              // If I run the tests without this done() I get an error saying 'The done() callback was never invoked!'
              done();
            });
          });
        }
      });
    });
    describe(`Visual comparison tests for ${service} ${pageType}`, () => {
      it('Front page', () => {
        if (
          Cypress.env('APP_ENV') === 'local' &&
          Cypress.browser.isHeadless &&
          snapshotConfig(service)
        ) {
          // arabic and persian front pages, and amp pages, are very deep and are having problems with lazy loading
          cy.url().then(url => {
            if (
              service !== 'arabic' &&
              service !== 'persian' &&
              !url.includes('.amp')
            ) {
              cy.setCookie('ckns_privacy', 'july2019');
              cy.setCookie('ckns_policy', '111');
              cy.setCookie('ckns_explicit', '1');
              cy.reload();
              cy.scrollTo('bottom', { duration: 6000 });
              cy.scrollTo('top', { duration: 6000 });
              cy.document().its('fonts.status').should('equal', 'loaded');

              cy.matchImageSnapshot({ capture: 'fullPage' });
            } else {
              cy.document().its('fonts.status').should('equal', 'loaded');
              cy.matchImageSnapshot();
            }
          });
        } else {
          cy.log('Snapshot skipped in headed mode');
        }
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
