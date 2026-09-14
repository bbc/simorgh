import {
  AresMediaBlock,
  AresMediaMetadataBlock,
} from '#app/components/MediaLoader/types';
import { ArticleContent } from '#app/models/types/optimo';
import getAppEnv from '#nextjs/cypress/support/helpers/getAppEnv';
import { ServiceParametersType } from '#nextjs/cypress/types';
import { getBlockData } from '../articlePage/helpers';

/* eslint-disable consistent-return */
export default ({ service, pageType }: ServiceParametersType) => {
  // Check the media player on the local environment only, as the live asset
  // doesn't have a media player.
  const describeOrSkip = getAppEnv() === 'local' ? describe : describe.skip;

  describeOrSkip(`Tests for ${service} ${pageType}`, () => {
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

              if (media) {
                cy.get('[data-e2e="media-loader__container"]')
                  .first()
                  .within(() => {
                    cy.get('[data-e2e="media-player"]')
                      .should('be.visible')
                      .should('have.attr', 'id')
                      .and('eq', 'bbcMediaPlayer0');
                  });
              }
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

                if (media && media.type === 'video') {
                  const aresMediaMetaDataBlock = (
                    media.model.blocks[1] as AresMediaBlock
                  ).model.blocks[0] as AresMediaMetadataBlock;
                  const { durationISO8601 } =
                    aresMediaMetaDataBlock.model.versions[0];
                  cy.get('[data-e2e="media-loader__container"]')
                    .first()
                    .within(() => {
                      cy.get('button.button.has_duration')
                        .should('be.visible')
                        .within(() => {
                          cy.get('svg').should('be.visible');
                        });

                      cy.get('time')
                        .should('be.visible')
                        .should('have.attr', 'datetime')
                        .and('eq', durationISO8601);
                    });
                }
              });
          },
        );
      },
    );
  });
};
