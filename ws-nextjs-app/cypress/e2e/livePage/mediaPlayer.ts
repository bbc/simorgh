import { getBlockData } from './helpers';

export default ({ service, id, pageType }) => {
  describe('Media Player', () => {
    let livePageData;
    before(() => {
      cy.getPageData({
        service,
        pageType,
        id,
      }).then(({ body }) => {
        livePageData = body;
      });
    });

    it('should render a visible placeholder image', () => {
      const media = getBlockData('video', livePageData);
      if (media) {
        cy.get('[data-e2e="media-loader__container"]')
          .first()
          .within(() => {
            cy.get('[data-e2e="media-loader__placeholder"] img')
              .should('be.visible')
              .should('have.attr', 'src')
              .should('not.be.empty');
          });
      }
    });

    it('should render a visible guidance message', () => {
      const media = getBlockData('video', livePageData);

      if (media) {
        const longGuidanceWarning =
          media.model.blocks[0].model.video.version.guidance;

        cy.get('[data-e2e="media-loader__container"]')
          .first()
          .within(() => {
            // Check for video with guidance message
            if (longGuidanceWarning) {
              cy.get('[data-e2e="media-loader__placeholder"]')
                .should('be.visible')
                .and('contain', longGuidanceWarning);
              // Check for video with no guidance message
            } else {
              cy.get('[data-e2e="media-loader__guidance"]').should('not.exist');
            }
          });
      }
    });

    it('should have a visible play button and valid duration', () => {
      const media = getBlockData('video', livePageData);
      if (media && media.type === 'video') {
        const { duration } = media.model.blocks[0].model.video.version;

        cy.get('[data-e2e="media-loader__container"]')
          .first()
          .within(() => {
            cy.get('button')
              .should('be.visible')
              .within(() => {
                cy.get('svg').should('be.visible');
                cy.get('time')
                  .should('be.visible')
                  .should('have.attr', 'dateTime')
                  .and('eq', duration);
              });
          });
      }
    });

    it('should render a toucan player when a user clicks play', () => {
      const media = getBlockData('video', livePageData);

      if (media && media.type === 'video') {
        cy.get('[data-e2e="media-loader__container"] button').first().click();
        cy.get(`smp-toucan-player`).should('be.visible');
      }
    });
  });
};
