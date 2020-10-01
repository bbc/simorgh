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
        const toggleKey = 'onOnDemandRadioPage';
        const isRadioScheduleOnPage = serviceHasRadioSchedule({
          service,
          variant,
          toggleKey,
        });
        cy.log(
          `On Demand Radio Page configured for Radio Schedule? ${isRadioScheduleOnPage}`,
        );

        if (isRadioScheduleOnPage) {
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
            if (isRadioScheduleOnPage && isRadioScheduleDataComplete) {
              cy.log('Schedule has enough data');
              cy.get('[data-e2e=radio-schedule]').should('exist');
              // cy.get('[data-e2e=live]').should('exist');
            } else {
              cy.get('[data-e2e=radio-schedule]').should('not.exist');
            }
          });
        }
      });
    });
  });
};
