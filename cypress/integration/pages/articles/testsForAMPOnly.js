import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getBlockData, getVideoEmbedUrl } from './helpers';
import config from '../../../support/config/services';
import { serviceNumerals } from '../../../../src/app/containers/MostRead/Canonical/Rank';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    it('should contain an amp-img', () => {
      if (serviceHasFigure(service)) {
        cy.get('figure')
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.get('amp-img').should('be.visible');
          });
      }
    });

    describe('Media Player: AMP', () => {
      it('should render a placeholder image', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const media = getBlockData('video', body);
          if (media && media.type === 'video') {
            cy.get('[data-e2e="media-player"]').within(() => {
              cy.get('div')
                .should('have.attr', 'data-e2e')
                .should('not.be.empty');
            });
          }
        });
      });

      it('should render an iframe with a valid URL', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const media = getBlockData('video', body);
          if (media && media.type === 'video') {
            const { lang } = appConfig[service][variant];
            const embedUrl = getVideoEmbedUrl(body, lang, true);
            cy.get(`amp-iframe[src="${embedUrl}"]`).should('be.visible');
            cy.testResponseCodeAndTypeRetry({
              path: embedUrl,
              responseCode: 200,
              type: 'text/html',
              allowFallback: true,
            });
          }
        });
      });
    });

    describe('Most Read Container', () => {
      /* These cypress tests are needed as unit tests cannot be run on the jsdom.
       * web workers (which run on amp pages) do not run on the virtual dom.
       */
      it.only(`should show the correct number of items for ${service}\`s ${pageType}`, () => {
        if (Cypress.env('APP_ENV') !== 'live' && service !== 'scotland') {
          const expectedMostReadItems =
            appConfig[config[service].name][variant].mostRead.numberOfItems;
          cy.get('[data-e2e="most-read"] > ol amp-list div')
            .scrollIntoView()
            .children('li')
            .should('have.length', expectedMostReadItems);
        }
      });

      it(`should show numerals used for the corresponding ${service} service`, () => {
        if (Cypress.env('APP_ENV') !== 'live' && service !== 'scotland') {
          const expectedMostReadRank = serviceNumerals(service);
          cy.get('[data-e2e="most-read"] > ol amp-list div')
            .scrollIntoView()
            .find('li span')
            .each(($el, index) => {
              // cy.should('have.text', expectedMostReadRank[index + 1]);
              expect($el.text()).equal(expectedMostReadRank[index + 1]);
            });
        }
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
