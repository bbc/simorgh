/* eslint-disable import/prefer-default-export */

import path from 'ramda/src/path';
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    beforeEach(() => {
      cy.getToggles(service);
    });
    describe('LinkedData', () => {
      // will be addressed by this https://github.com/bbc/simorgh/issues/3117
      it.skip('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'headline');
      });
    });

    describe(
      'Audio Player',
      {
        retries: 3,
      },
      () => {
        it('should render a valid media player', () => {
          cy.get('[data-e2e="media-loader__container"]').should('exist');
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
            cy.getPageDataFromWindow().then(data => {
              const { pageData } = data;
              const schedules = pageData.radioScheduleData;

              if (schedules) {
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
