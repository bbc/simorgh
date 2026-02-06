/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable consistent-return */
import { getEpisodeAvailability } from '#cypress/support/helpers/onDemandRadioTv';
import chartbeatTests from '#cypress/support/helpers/chartbeatTests';
import runIfToggleEnabled from '#nextjs/cypress/support/helpers/runIfToggleEnabled';
import getToggleValue from '#nextjs/cypress/support/helpers/getToggleValue';

export default ({ service, pageType, path, variant = 'default' }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe(
      'Audio Player',
      {
        retries: 3,
      },
      () => {
        it('should render a valid media player', () => {
          cy.getPageDataFromWindow().then(pageData => {
            if (!getEpisodeAvailability(pageData)) {
              return cy.log(`Episode is not available: ${path}}`);
            }

            cy.get('[data-e2e="media-loader__container"]').should('be.visible');
          });
        });
      },
    );
    describe(`Tests for ${service} ${pageType} ${variant} with toggle use`, () => {
      describe('Recent Episodes component', () => {
        it('should be displayed if the toggle is on, and shows the expected number of items', function test() {
          let toggleName;
          if (path?.includes('podcasts')) {
            toggleName = 'recentPodcastEpisodes';
          } else {
            toggleName = 'recentAudioEpisodes';
          }
          runIfToggleEnabled({
            service,
            toggleName,
            testContext: this,
          });

          cy.log(
            `Recent Episodes component enabled are enabled for ${service} ${pageType} ${variant}`, // check
          );
          // There cannot be more episodes shown than the max allowed
          const recentEpisodesMaxNumber = getToggleValue({
            service,
            toggleName,
            testContext: this,
          });
          if (recentEpisodesMaxNumber !== undefined) {
            const recentEpisodesMaxNumberInt = parseInt(
              recentEpisodesMaxNumber as string,
              10,
            );
            cy.getPageDataFromWindow().then(pageData => {
              const { recentEpisodes } = pageData;

              if (
                recentEpisodes?.length > 1 &&
                recentEpisodesMaxNumberInt > 1
              ) {
                cy.get('[data-e2e=recent-episodes-list]').should('exist');

                cy.get('[data-e2e=recent-episodes-list]').within(() => {
                  cy.get('[data-e2e=recent-episodes-list-item]').should(
                    'have.length.of.at.most',
                    recentEpisodesMaxNumberInt,
                  );
                });
              }
            });
          } else {
            cy.get('[data-e2e=recent-episodes-list]').should('not.exist');
            cy.log('Recent episodes max number is undefined');
          }
        });
      });
      describe('Radio Schedule', () => {
        it('should be displayed if there is enough schedule data', function test() {
          runIfToggleEnabled({
            service,
            toggleName: 'onDemandRadioSchedule',
            testContext: this,
          });
          cy.getPageDataFromWindow().then(pageData => {
            cy.log(
              `On Demand Radio Page configured for Radio Schedule? ${service} ${pageType} ${variant}`,
            );
            const { radioScheduleData } = pageData;
            if (radioScheduleData) {
              cy.log('Schedule has enough data');
              cy.get('[data-e2e=radio-schedule]').should('exist');
              // cy.get('[data-e2e=live]').should('exist');
            } else {
              cy.get('[data-e2e=radio-schedule]').should('not.exist');
            }
          });
        });
      });
    });

    chartbeatTests();
  });
};
