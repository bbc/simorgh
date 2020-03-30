import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import { hasMedia, getEmbedUrl } from './helpers';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
    it('should change to the correct script when the script switch is clicked', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const { language } = body.metadata;
        // Accepts cookies
        cy.get(
          '#root > header > div.Wrapper-sc-7g3fro-0.fOqUqv > div > ul > li:nth-child(1) > button',
        ).click();
        // This sets up a way of checking the MAP page content is in the right script,
        // regardless of the content input in CPS, as the timestamp should always match the script
        // Open to suggestions for a better way. Maybe not necessary.
        if (language === 'sr-Cyrl') {
          const cyrMonths = [
            'јан',
            'феб',
            'мар',
            'апр',
            'мај',
            'јун',
            'јул',
            'авг',
            'сеп',
            'окт',
            'нов',
            'дец',
          ];
          const latMonths = [
            'jan',
            'feb',
            'mar',
            'apr',
            'maj',
            'jun',
            'jul',
            'avg',
            'sep',
            'okt',
            'nov',
            'dec',
          ];
          const cyrRegex = new RegExp(`${cyrMonths.join('|')}`, 'g');
          const latRegex = new RegExp(`${latMonths.join('|')}`, 'g');
          // Checks script switcher says Lat
          cy.get('.kRCdQO > div:nth-child(1) > div:nth-child(3)').contains(
            'Lat',
          );
          // Checks MAP is rendered in correct script
          cy.get(
            'div.GridItemConstrainedMedium-sc-12lwanc-2:nth-child(4)',
          ).contains(cyrRegex);
          // Clicks script switcher
          cy.get('#root > header > div > div > div > a').click();
          // Checks lat cookie is set
          cy.getCookie('ckps_serbian').should('have.property', 'value', 'lat');
          // Clicks home button to navigate to home page
          cy.get(
            '#root > header > nav > div > div.ScrollableWrapper-t4argr-0.UDeIc > div > ul > li:nth-child(1) > a',
          ).click();
          // Checks correct cookie has persisted
          cy.getCookie('ckps_serbian').should('have.property', 'value', 'lat');
          // Checks script switcher says Ћир
          cy.get(
            '#root > header > div.Banner-m3awbo-1.iMfYXj > div > div > a',
          ).contains('Ћир');
          // Navigates to a MAP
          cy.get(
            '#root > main > div > section:nth-child(1) > div.FirstSectionTopMargin-sc-1t555e8-1.czsSMn > ul > li.StoryPromoLi-sc-171lqjd-0.dqJaJG.GridComponent-nf79gm-0.kFXEso > div > div.TextGridItem-sc-1lkbq5i-0.gAqLWy > h3 > a',
          ).click();
          // Checks latin script has persisted
          cy.get(
            'div.GridItemConstrainedMedium-sc-12lwanc-2:nth-child(4)',
          ).contains(latRegex);
          cy.get('.kRCdQO > div:nth-child(1) > div:nth-child(3)').click();
          cy.getCookie('ckps_serbian').should('have.property', 'value', 'cyr');
          cy.get(
            'div.GridItemConstrainedMedium-sc-12lwanc-2:nth-child(4)',
          ).contains(cyrRegex);
        } else if (language === 'sr-Latn') {
          cy.get('.kRCdQO > div:nth-child(1) > div:nth-child(3)').contains(
            'Ћир',
          );
        }
      });
    });
    it('should render a media player', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const language = appConfig[config[service].name][variant].lang;
        const embedUrl = getEmbedUrl(body, language);

        cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
      });
    });

    it('should play media', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const canPlayMedia = hasMedia(body);

        if (!canPlayMedia) throw new Error('No media detected');

        // Ensure media player is ready
        cy.get(
          'div[class^="StyledVideoContainer"] iframe[class^="StyledIframe"]',
        ).then($iframe => {
          cy.wrap($iframe.prop('contentWindow'), {
            timeout: 30000,
          })
            .its('embeddedMedia.playerInstances.mediaPlayer.ready')
            .should('eq', true);
        });

        const playButton = 'button.p_cta';

        cy.get('iframe').then(iframe => {
          cy.wrap(iframe.contents().find('iframe'))
            .should(inner => expect(inner.contents().find(playButton)).to.exist)
            .then(inner => cy.wrap(inner.contents().find(playButton)).click())
            .then(() => {
              cy.wrap(iframe.prop('contentWindow'), {
                timeout: 45000,
              })
                .its('embeddedMedia.playerInstances.mediaPlayer')
                .invoke('currentTime')
                .should('be.gt', 0);
            });
        });
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
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
