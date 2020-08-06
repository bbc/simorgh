import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import { getEmbedUrl, serviceHasRadioSchedule } from './helper';
import { isScheduleDataComplete } from '../../../../src/app/containers/RadioSchedule/utilities/evaluateScheduleData';
import getDataUrl from '../../../support/helpers/getDataUrl';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      const { lang } = appConfig[service][variant];
      let embedUrl;

      beforeEach(() => {
        cy.request(getDataUrl(Cypress.env('currentPath'))).then(({ body }) => {
          embedUrl = getEmbedUrl(body, lang);
        });
      });

      it('should be rendered', () => {
        cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
      });

      it('embed URL should be reachable', () => {
        cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
      });
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
      it('should be displayed if there is enough schedule data', () => {
        const isRadioScheduleOnPage = serviceHasRadioSchedule({
          service,
          variant,
        });
        cy.log(
          `Live Radio Page configured for Radio Schedule? ${isRadioScheduleOnPage}`,
        );

        if (isRadioScheduleOnPage) {
          const schedulePath = Cypress.env('currentPath').replace(
            'liveradio',
            'schedule.json',
          );

          cy.request(schedulePath).then(({ body: scheduleJson }) => {
            const { schedules } = scheduleJson;

            const isRadioScheduleDataComplete = isScheduleDataComplete({
              schedules,
            });

            cy.log(
              `Radio Schedule is displayed? ${isRadioScheduleDataComplete}`,
            );
            if (isRadioScheduleOnPage && isRadioScheduleDataComplete) {
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

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
