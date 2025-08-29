import path from 'ramda/src/path';
import { crossPlatform as mostReadAssertions } from '../mostReadPage/mostReadAssertions';
import getAppEnv from '../../../support/helpers/getAppEnv';

const twoYearsAgo = new Date().getFullYear() - 2;

const isArticleLessThanTwoYearsOld = () => {
  return cy
    .get(`main time`)
    .invoke('attr', 'datetime')
    .then(fullDate => {
      const isNewArticle = Number(fullDate.split('-')[0]) > Number(twoYearsAgo);
      return isNewArticle && getAppEnv() === 'live';
    });
};
export default ({ service, pageType, isAmp, variant = 'default' }) => {
  describe(`Running tests for ${service} ${pageType} `, () => {
    /**
     * Most Read Component
     */
    mostReadAssertions({ service, variant });

    describe(`Recommendations on ${service} ${pageType}`, () => {
      it('Recommendations have images', () => {
        isArticleLessThanTwoYearsOld().then(runRecommendationTests => {
          if (runRecommendationTests) {
            cy.getToggles(service);
            cy.fixture(`toggles/${service}.json`).then(toggles => {
              const mostReadEnabled = path(['mostRead', 'enabled'], toggles);

              if (mostReadEnabled) {
                cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
                cy.get(
                  '[data-e2e=recommendations-heading] > div > ul > li',
                ).each((item, index) => {
                  cy.wrap(item).within(() => {
                    cy.log(`List item number: ${index}`);
                    cy.log(`isAmp= ${isAmp}`);
                    if (isAmp) {
                      cy.get(
                        `[data-e2e=recommendations-wrapper] amp-img`,
                      ).should('have.attr', 'src');
                    } else {
                      cy.get(`[data-e2e=recommendations-wrapper] img`).should(
                        'have.attr',
                        'src',
                      );
                    }
                  });
                });
              }
            });
          } else {
            cy.log(
              'Only tests on live and for articles less than 2 years old due to lack of test data',
            );
          }
        });
      });

      it('Recommendations have titles', () => {
        isArticleLessThanTwoYearsOld().then(runRecommendationTests => {
          if (runRecommendationTests) {
            cy.getToggles(service);
            cy.fixture(`toggles/${service}.json`).then(toggles => {
              const mostReadEnabled = path(['mostRead', 'enabled'], toggles);

              if (mostReadEnabled) {
                cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
                cy.get(
                  '[data-e2e=recommendations-heading] > div > ul > li',
                ).each((item, index) => {
                  cy.wrap(item).within(() => {
                    cy.log(`List item number: ${index + 1}`);
                    cy.get(`[data-e2e=recommendations-wrapper] > div > div > a`)
                      .invoke('text')
                      .then(text => {
                        expect(text.length).to.be.at.least(1);
                      });
                  });
                });
              }
            });
          } else {
            cy.log(
              'Only tests on live and for articles less than 2 years old due to lack of test data',
            );
          }
        });
      });
    });
  });
};
