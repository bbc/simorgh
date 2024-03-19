import path from 'ramda/src/path';
import { overrideRendererOnTest } from '../../../support/helpers/onDemandRadioTv';
import {
  isScheduleDataComplete,
  getIsProgramValid,
} from '../../../../src/app/legacy/containers/RadioSchedule/utilities/evaluateScheduleData';
import chartbeatTests from '../../../support/helpers/chartbeatTests';

export default ({ service }) => {
  beforeEach(() => {
    cy.getToggles(service);
  });

  chartbeatTests();

  describe('Radio Schedule', () => {
    it('should be displayed if there is enough schedule data', () => {
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
};
