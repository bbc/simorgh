/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import appConfig from '#src/server/utilities/serviceConfigs';
import { Services } from '#app/models/types/global';
import { ArticleContent, OptimoBlock } from '#app/models/types/optimo';
import {
  AresMediaBlock,
  AresMediaMetadataBlock,
  CaptionBlock,
} from '#app/components/MediaLoader/types';
import { ServiceParametersType } from '../../types';
import { getBlockData, getBlockByType, getVideoEmbedUrl } from './helpers';
import runIfToggleEnabled from '../../support/helpers/runIfToggleEnabled';
import chartbeatTests from '../../support/helpers/chartbeatTests';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasCaption = (service: Services) => service === 'news';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({
  service,
  pageType,
  variant = 'default',
}: ServiceParametersType) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    chartbeatTests();

    if (serviceHasCaption(service)) {
      describe('Image with placeholder', () => {
        it('should have a visible image that is not lazyloaded', () => {
          cy.get('[data-e2e="image-placeholder"]')
            .eq(0)
            .should('be.visible')
            .should('to.have.descendants', 'img')
            .within(() => {
              cy.get('div[class*="lazyload-placeholder"]').should('not.exist');
            });
        });

        it('should have a visible image that is lazyloaded and has a noscript fallback image', () => {
          cy.get('[data-e2e="image-placeholder"]').eq(1).as('imagePlaceholder');
          cy.get('@imagePlaceholder').should('be.visible');
          cy.get('@imagePlaceholder').scrollIntoView();
          cy.get('@imagePlaceholder').within(() => {
            cy.get('noscript').contains('<img ');
            cy.get('div[class*="lazyload-placeholder"]').should('exist');
          });
        });

        it('should have an image with a caption', () => {
          cy.window().then(win => {
            const { pageData } = win.__NEXT_DATA__.props.pageProps;
            const imageData = getBlockData('image', pageData);
            const captionBlock =
              imageData?.model?.blocks &&
              getBlockByType(imageData.model.blocks, 'caption');

            if (captionBlock) {
              const {
                model: { blocks },
              } = captionBlock as CaptionBlock;

              const {
                model: { text: captionText },
              } = (blocks?.[0] as ArticleContent).model
                .blocks[0] as AresMediaMetadataBlock;

              if (captionText) {
                cy.get('figcaption')
                  .eq(0)
                  .should('be.visible')
                  .and('contain', captionText);
              } else {
                // check for image with no caption
                cy.get('figure')
                  .eq(0)
                  .within(() => {
                    cy.get('figcaption').should('not.exist');
                  });
              }
            }
          });
        });
      });
    }

    it('should have a lite site link', function test() {
      runIfToggleEnabled({
        service,
        toggleName: 'articleLiteSiteLink',
        testContext: this,
      });
      cy.get('[data-e2e="article-lite-site-link"]').within(() => {
        cy.get('a')
          .should('have.attr', 'href')
          .then($href => {
            cy.get('a').click();
            cy.url().should('contain', $href).should('contain', '.lite');
          });
      });
      cy.go('back');
    });

    describe('Media Player: Canonical', () => {
      it('should render a visible placeholder image', () => {
        cy.window().then(win => {
          const { pageData } = win.__NEXT_DATA__.props.pageProps;
          const media = getBlockData('video', pageData);

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
      });

      it('should render a visible guidance message', () => {
        cy.window().then(win => {
          const { pageData } = win.__NEXT_DATA__.props.pageProps;
          const media = getBlockData('video', pageData);

          if (media) {
            const aresMediaMetadata = (media.model.blocks[1] as ArticleContent)
              .model.blocks[0] as AresMediaMetadataBlock;

            const longGuidanceWarning =
              aresMediaMetadata.model.versions[0].warnings?.long;

            cy.get('[data-e2e="media-loader__container"]')
              .eq(0)
              .within(() => {
                // Check for video with guidance message
                if (longGuidanceWarning) {
                  cy.get('[data-e2e="media-player__guidance"] strong')
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
          const { pageData } = win.__NEXT_DATA__.props.pageProps;
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
      if (service === 'pidgin') {
        it('should render a media player with a valid embed URL when a user clicks play', () => {
          cy.window().then(win => {
            const { pageData } = win.__NEXT_DATA__.props.pageProps;
            const media = getBlockData<OptimoBlock>('video', pageData);
            if (media && media.type === 'video') {
              const { lang } = appConfig[service][variant];
              const embedUrl = getVideoEmbedUrl(pageData, lang);
              cy.get('[data-e2e="media-loader__container"] button')
                .first()
                .click();
              cy.get('[data-e2e="media-player"]').should('be.visible');

              cy.testResponseCodeAndRetry({
                url: embedUrl,
                allowFallback: true,
              });
            }
          });
        });
      }
    });
  });
