import {
  AresMediaBlock,
  AresMediaMetadataBlock,
} from '#app/components/MediaLoader/types';
import { ArticleContent } from '#app/models/types/optimo';
import { ServiceParametersType } from '#nextjs/cypress/types';
import { getBlockData } from '../articlePage/helpers';

/* eslint-disable consistent-return */
export default ({ service, pageType }: ServiceParametersType) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe(
      'Video Player',
      {
        retries: 3,
      },
      () => {
        it('should render a visible media player', () => {
          cy.window()
            .getPageDataFromWindow()
            .then(pageData => {
              const media = getBlockData('video', pageData);

              expect(media, 'expected a video block in watch page data').to
                .exist;

              cy.get('[data-e2e="media-loader__container"]')
                .first()
                .within(() => {
                  cy.get('[data-e2e="media-player"]')
                    .should('be.visible')
                    .should('have.attr', 'id')
                    .and('eq', 'bbcMediaPlayer0');
                });
            });
        });

        it(
          'should have a visible play button and valid duration',
          { includeShadowDom: true },
          () => {
            cy.window()
              .getPageDataFromWindow()
              .then(pageData => {
                const media = getBlockData<ArticleContent & { type: string }>(
                  'video',
                  pageData,
                );

                const aresMediaMetaDataBlock = (
                  media?.model.blocks[1] as AresMediaBlock
                ).model.blocks[0] as AresMediaMetadataBlock;
                const { durationISO8601 } =
                  aresMediaMetaDataBlock.model.versions[0];
                cy.get('[data-e2e="media-loader__container"]')
                  .first()
                  .within(() => {
                    cy.get('button.has_duration', { includeShadowDom: true })
                      .should('be.visible')
                      .within(() => {
                        cy.get('svg').should('be.visible');
                      });

                    cy.get('time')
                      .should('be.visible')
                      .should('have.attr', 'datetime')
                      .and('eq', durationISO8601);
                  });
              });
          },
        );
      },
    );
  });
};
