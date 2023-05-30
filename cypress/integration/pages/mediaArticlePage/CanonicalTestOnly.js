import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getBlockData, getVideoEmbedUrl } from '../articles/helpers';

export default ({ service, pageType, variant }) => {
  describe(`Canonical only test for ${service} ${pageType}`, () => {
    describe(`Chartbeat analytics`, () => {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });
      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    });

    describe('Media Player: Canonical', () => {
      it('should render a visible placeholder image', () => {
        cy.window().then(win => {
          const media = getBlockData('video', {
            data: { article: win.SIMORGH_DATA.pageData },
          });
          if (media) {
            cy.get('[data-e2e="media-player"]').within(() => {
              cy.get('[data-e2e="media-player__placeholder"] img')
                .should('be.visible')
                .should('have.attr', 'src')
                .should('not.be.empty');
            });
          }
        });
      });

      it('should render a visible guidance message', () => {
        cy.window().then(win => {
          const media = getBlockData('video', {
            data: { article: win.SIMORGH_DATA.pageData },
          });

          if (media) {
            const longGuidanceWarning =
              media.model.blocks[1].model.blocks[0].model.versions[0].warnings
                .long;

            cy.get('[data-e2e="media-player"]')
              .eq(0)
              .within(() => {
                // Check for video with guidance message
                if (longGuidanceWarning) {
                  cy.get('[data-e2e="media-player__placeholder"] strong')
                    .should('be.visible')
                    .and('contain', longGuidanceWarning);
                  // Check for video with no guidance message
                } else {
                  cy.get('[data-e2e="media-player__guidance"] strong').should(
                    'not.exist',
                  );
                }
              });
          }
        });
      });

      it('should have a visible play button and valid duration', () => {
        cy.window().then(win => {
          const media = getBlockData('video', {
            data: { article: win.SIMORGH_DATA.pageData },
          });
          if (media && media.type === 'video') {
            const aresMediaBlocks = media.model.blocks[1].model.blocks[0];
            const { durationISO8601 } = aresMediaBlocks.model.versions[0];

            cy.get('[data-e2e="media-player"]').within(() => {
              cy.get('button')
                .should('be.visible')
                .within(() => {
                  cy.get('svg').should('be.visible');
                  cy.get('time')
                    .should('be.visible')
                    .should('have.attr', 'datetime')
                    .and('eq', durationISO8601);
                });
            });
          }
        });
      });

      it('should render an iframe with a valid URL when a user clicks play', () => {
        cy.window().then(win => {
          const body = win.SIMORGH_DATA.pageData;

          const media = getBlockData('video', {
            data: { article: body },
          });

          if (media && media.type === 'video') {
            const { lang } = appConfig[service][variant];
            const embedUrl = getVideoEmbedUrl(
              {
                data: { article: body },
              },
              lang,
            );
            cy.get('[data-e2e="media-player"] button').click();
            cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
          }
        });
      });
    });
  });
};
