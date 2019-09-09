import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import * as moment from 'moment-timezone';
import config from '../../../support/config/services';
import appConfig from '../../../../src/app/lib/config/services';

const getBlockByType = (blocks, blockType) => {
  let blockData;

  blocks.forEach(block => {
    if (!blockData && block.type === blockType) {
      blockData = block;
    }
  });
  return blockData;
};

const getBlockData = (blockType, body) => {
  const { blocks } = body.content.model;

  return getBlockByType(blocks, blockType);
};

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);
const serviceHasCaption = service => service === 'news';
// TODO: Remove after https://github.com/bbc/simorgh/issues/2962
const serviceHasCorrectlyRenderedParagraphs = service => service !== 'sinhala';

const serviceHasTimestamp = service => ['news', 'urdu'].includes(service);

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`Running testsToAlwaysRun for ${service} ${pageType}`, () => {
    if (serviceHasTimestamp(service)) {
      it('should render a formatted timestamp', () => {
        cy.request(`${config[service].pageTypes.articles.path}.json`).then(
          ({ body }) => {
            const { language } = body.metadata.passport;
            const { lastPublished, firstPublished } = body.metadata;
            const updatedTimestamp = moment
              .tz(lastPublished, `${appConfig[service].timezone}`)
              .locale(language)
              .format('D MMMM YYYY');
            const firstTimestamp = moment
              .tz(firstPublished, `${appConfig[service].timezone}`)
              .locale(language)
              .format('D MMMM YYYY');
            if (lastPublished === firstPublished) {
              cy.get('time').should('contain', updatedTimestamp);
            } else {
              cy.get('time')
                .eq(0)
                .should('contain', firstTimestamp);
              cy.get('time')
                .eq(1)
                .should(
                  'contain',
                  `${`${appConfig[service].articleTimestampPrefix}` +
                    ' '}${updatedTimestamp}`,
                );
            }
          },
        );
      });
    }
  });
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    describe(`Metadata`, () => {
      // Here we should only have metadata tests that are unique to articles pages
      it('should have the correct articles metadata', () => {
        cy.get('meta[name="article:author"]').should(
          'have.attr',
          'content',
          appConfig[service].articleAuthor,
        );
      });

      it('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'author')
          .and('contain', 'headline');
      });
    });

    describe(`Article Body`, () => {
      it('should render a H1, which contains/displays a styled headline', () => {
        cy.request(`${config[service].pageTypes.articles.path}.json`).then(
          ({ body }) => {
            const headlineData = getBlockData('headline', body);
            cy.get('h1').should(
              'contain',
              headlineData.model.blocks[0].model.blocks[0].model.text,
            );
          },
        );
      });

      it('should render an H2, which contains/displays a styled subheading', () => {
        cy.request(`${config[service].pageTypes.articles.path}.json`).then(
          ({ body }) => {
            if (body.metadata.language === 'en-gb') {
              const subheadingData = getBlockData('subheadline', body);
              cy.get('h2').should(
                'contain',
                subheadingData.model.blocks[0].model.blocks[0].model.text,
              );
            }
          },
        );
      });

      it('should render a paragraph, which contains/displays styled text', () => {
        if (serviceHasCorrectlyRenderedParagraphs(service)) {
          cy.request(`${config[service].pageTypes.articles.path}.json`).then(
            ({ body }) => {
              const paragraphData = getBlockData('text', body);
              const { text } = paragraphData.model.blocks[0].model;

              cy.get('p').should('contain', text);
            },
          );
        }
      });

      if (serviceHasFigure(service)) {
        it('should have a placeholder image', () => {
          cy.get('figure div div div')
            .eq(0)
            .should(el => {
              expect(el).to.have.css(
                'background-image',
                `url("data:image/svg+xml;base64,${BBC_BLOCKS}")`,
              );
            });
        });

        if (serviceHasCaption(service)) {
          it('should have a visible image without a caption, and also not be lazyloaded', () => {
            cy.get('figure')
              .eq(0)
              .should('be.visible')
              .should('to.have.descendants', 'img')
              .should('not.to.have.descendants', 'figcaption')
              .within(() => cy.get('noscript').should('not.exist'));
          });
        }

        it('should have an image copyright label with styling', () => {
          cy.request(`${config[service].pageTypes.articles.path}.json`).then(
            ({ body }) => {
              const copyrightData = getBlockData('image', body);
              const rawImageblock = getBlockByType(
                copyrightData.model.blocks,
                'rawImage',
              );
              const { copyrightHolder } = rawImageblock.model;

              cy.get('figure')
                .eq(0)
                .then($fig => {
                  if ($fig.find('p').length > 0) {
                    cy.get('figure p')
                      .eq(0)
                      .should('contain', copyrightHolder);
                  } else {
                    // If an image has a BBC copyright, the copyright holder (<p>) does not appear on images.
                    // This is why we're asserting the value. If the copyright does not appear and is not
                    // 'BBC' then it is clear there is an error with this component.
                    expect(copyrightHolder).to.eq('BBC');
                  }
                });
            },
          );
        });
      }

      it('should have an inline link', () => {
        cy.request(`${config[service].pageTypes.articles.path}.json`).then(
          ({ body }) => {
            if (body.metadata.language === 'en-gb') {
              cy.get('main a');
            }
          },
        );
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
