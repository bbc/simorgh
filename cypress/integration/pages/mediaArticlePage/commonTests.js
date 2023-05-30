import { getBlockByType, getBlockData } from '../articles/helpers';

export default ({ service, pageType, variant }) => {
  let mediaArticleData;
  describe(`Tests for ${service} ${pageType}`, () => {
    before(() => {
      cy.getPageData({ service, pageType: 'article', variant }).then(
        response => {
          mediaArticleData = response.body;
          // console.log(JSON.stringify(mediaArticleData));
        },
      );
    });

    describe('Media Player', () => {
      it('caption beneath a mediaplayer is visible', () => {
        const media = getBlockData('video', mediaArticleData);
        const { text } = getBlockByType(media.model.blocks, 'caption').model
          .blocks[0].model.blocks[0].model;
        cy.get('figcaption').within(() => {
          cy.get('p').should('be.visible').should('contain', text);
        });
      });
    });

    it('load "latest media onwards journey"', () => {
      cy.get('[data-testid="latest-media"]').should('exist');
    });
  });
};
