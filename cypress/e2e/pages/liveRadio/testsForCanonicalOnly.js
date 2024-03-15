/* eslint-disable import/prefer-default-export */
import path from 'ramda/src/path';
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import getEmbedUrl from '../../../support/helpers/getEmbedUrl';
import {
  isScheduleDataComplete,
  getIsProgramValid,
} from '../../../../src/app/legacy/containers/RadioSchedule/utilities/evaluateScheduleData';
import getDataUrl from '../../../support/helpers/getDataUrl';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
    beforeEach(() => {
      cy.getToggles(service);
    });

    describe(
      'Audio Player',
      {
        retries: 3,
      },
      () => {
        const { lang } = appConfig[service][variant];
        let embedUrl;

        beforeEach(() => {
          cy.request(getDataUrl(Cypress.env('currentPath'))).then(
            ({ body }) => {
              embedUrl = getEmbedUrl(body, lang);
            },
          );
        });

        it('should be rendered', () => {
          cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
        });

        it('embed URL should be reachable', () => {
          cy.testResponseCodeAndTypeRetry({
            path: embedUrl,
            responseCode: 200,
            type: 'text/html',
            allowFallback: true,
          });
        });
      },
    );

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
            ['liveRadioSchedule', 'enabled'],
            toggles,
          );
          cy.log(
            `Live Radio Page configured for Radio Schedule? ${scheduleIsEnabled}`,
          );

          if (scheduleIsEnabled) {
            const schedulePath = Cypress.env('currentPath')
              .replace('liveradio', 'schedule.json')
              // the schedule call for afaanoromoo is made to bbc_oromo_radio
              .replace('bbc_afaanoromoo_radio', 'bbc_oromo_radio');

            cy.request(schedulePath).then(({ body: scheduleJson }) => {
              const { schedules } = scheduleJson;
              const isProgramValid = getIsProgramValid(() => {});
              const validSchedules = schedules.filter(isProgramValid);

              const isRadioScheduleDataComplete = isScheduleDataComplete({
                schedules: validSchedules,
              });

              cy.log(
                `Radio Schedule is displayed? ${isRadioScheduleDataComplete}`,
              );
              if (scheduleIsEnabled && isRadioScheduleDataComplete) {
                cy.log('Schedule has enough data');
                cy.get('[data-e2e=radio-schedule]').should('exist');
              } else {
                cy.get('[data-e2e=radio-schedule]').should('not.exist');
              }
            });
          }
        });
      });
    });
  });
