import path from 'ramda/src/path';
import getDataUrl from '../../../support/helpers/getDataUrl';
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import { isScheduleDataComplete } from '../../../../src/app/containers/RadioSchedule/utilities/evaluateScheduleData';

export default ({ service, pageType, variant }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType} ${variant}`, () => {
    beforeEach(() => {
      cy.getToggles(config[service].name);
    });

    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
    describe('Radio Schedule', () => {
      it('should be displayed if there is enough schedule data', function test() {
        cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
          const scheduleIsEnabled = path(
            ['onDemandRadioSchedule', 'enabled'],
            toggles,
          );
          cy.log(
            `On Demand Radio Page configured for Radio Schedule? ${scheduleIsEnabled}`,
          );

          if (scheduleIsEnabled) {
            const currentPath = Cypress.env('currentPath');

            const masterBrand = currentPath.split('/')[2];

            let schedulePath = `/${service}/${masterBrand}/schedule.json`.replace(
              'bbc_afaanoromoo_radio',
              'bbc_oromo_radio',
            );
            if (Cypress.env('APP_ENV') === 'test') {
              schedulePath += '?renderer_env=live';
            }

            cy.request(schedulePath).then(({ body: scheduleJson }) => {
              const { schedules } = scheduleJson;

              const isRadioScheduleDataComplete = isScheduleDataComplete({
                schedules,
              });

              cy.log(
                `Radio Schedule is displayed? ${isRadioScheduleDataComplete}`,
              );
              if (scheduleIsEnabled && isRadioScheduleDataComplete) {
                cy.log('Schedule has enough data');
                cy.get('[data-e2e=radio-schedule]').should('exist');
                // cy.get('[data-e2e=live]').should('exist');
              } else {
                cy.get('[data-e2e=radio-schedule]').should('not.exist');
              }
            });
          } else {
            cy.get('[data-e2e=radio-schedule]').should('not.exist');
          }
        });
      });
    });
    describe('Recent Episodes component', () => {
      it('should be displayed if the toggle is on, and shows the expected number of items (max 4)', function test() {
        cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
          const recentEpisodesEnabled = path(
            ['recentAudioEpisodes', 'enabled'],
            toggles,
          );
          cy.log(`Recent Episodes component enabled? ${recentEpisodesEnabled}`);

          if (recentEpisodesEnabled) {
            const currentPath = Cypress.env('currentPath');
            const url =
              Cypress.env('APP_ENV') === 'test'
                ? `${currentPath}?renderer_env=live`
                : `${currentPath}`;

            cy.request(getDataUrl(url)).then(({ body }) => {
              const maxNumberofItems = 4;
              const numberOfEpisodes =
                body.relatedContent.groups[0].promos.length;

              cy.log(`Number of recent episodes ? ${numberOfEpisodes}`);
              if (numberOfEpisodes > 0) {
                cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
                  'exist',
                );

                const expectedNumberOfEpisodes = Math.min(
                  numberOfEpisodes,
                  maxNumberofItems,
                );
                cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").within(
                  () => {
                    cy.get("li[class*='css-9kvqqh-StyledEpisodeListItem']")
                      .its('length')
                      .should('eq', expectedNumberOfEpisodes);
                  },
                );
              } else {
                cy.get("div[id*='recent-episodes']").should('not.exist');
              }
            });
          } else {
            cy.get("div[id*='recent-episodes']").should('not.exist');
            cy.log('No recent episodes in data');
          }
        });
      });
    });
  });
};
