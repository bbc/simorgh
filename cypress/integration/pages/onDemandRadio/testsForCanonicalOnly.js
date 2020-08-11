import envConfig from '../../../support/config/envs';
import { serviceHasRadioSchedule } from '../liveRadio/helper';
import { isScheduleDataComplete } from '../../../../src/app/containers/RadioSchedule/utilities/evaluateScheduleData';

export default ({ service, pageType, variant }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType} ${variant}`, () => {
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
          `On Demand Radio Page configured for Radio Schedule? ${isRadioScheduleOnPage}`,
        );

        if (isRadioScheduleOnPage) {
          const schedulePath = Cypress.env('currentPath');
          const index = schedulePath.lastIndexOf('_radio/');
          let newUrl = `${schedulePath.substring(
            0,
            index + 6,
          )}/schedule.json?renderer_env=live`;
          newUrl = newUrl.replace('bbc_afaanoromoo_radio', 'bbc_oromo_radio');
          cy.log(newUrl);

          cy.request(newUrl).then(({ body: scheduleJson }) => {
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
};
