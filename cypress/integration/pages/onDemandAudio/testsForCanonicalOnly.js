import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';
import { overrideRendererOnTest } from '../../../support/helpers/onDemandRadioTv';
import {
  isScheduleDataComplete,
  getIsProgramValid,
} from '../../../../src/app/legacy/containers/RadioSchedule/utilities/evaluateScheduleData';

export default ({ service, pageType, variant }) => {
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
  describe(`testsForCanonicalOnly for ${service} ${pageType} ${variant}`, () => {
    beforeEach(() => {
      cy.getToggles(service);
    });

    describe('Radio Schedule', () => {
      it('should be displayed if there is enough schedule data', function test() {
        const currentPath = `${Cypress.env(
          'currentPath',
        )}.json${overrideRendererOnTest()}`;

        cy.request(currentPath).then(({ body: jsonData }) => {
          cy.fixture(`toggles/${service}.json`).then(toggles => {
            const scheduleIsEnabled = path(
              ['onDemandRadioSchedule', 'enabled'],
              toggles,
            );
            cy.log(
              `On Demand Radio Page configured for Radio Schedule? ${scheduleIsEnabled}`,
            );

            if (scheduleIsEnabled) {
              const masterBrand = jsonData.metadata.createdBy;

              const schedulePath =
                `/${service}/${masterBrand}/schedule.json${overrideRendererOnTest()}`.replace(
                  'bbc_afaanoromoo_radio',
                  'bbc_oromo_radio',
                );

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
    });
  });
};
