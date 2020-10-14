import path from 'ramda/src/path';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service }) => {
  describe(`Include initialisation only on Mundo on specific page`, () => {
    // This test ensures that inline scripts used in includes execute successfully and
    // progressively enhance the include. These scripts can be supressed by the browser
    // if they are rendered in the browser following clientside render tree modification;
    // our story pages should not do this. The test checks the core content has been removed
    // following progressive enhancement by the include's inline scripts.
    it('should load the eclipse VJ include successfully', () => {
      if (service === 'mundo') {
        cy.get(
          '#responsive-embed-vjamericas-176-eclipse-lookup-app-core-content',
        ).should('not.exist');
      }
    });
  });

  describe('Social Embed', () => {
    // This test specifically covers an edge case where more than one tweet is
    // included in a Story and twitter needs to be prompted to render the tweet
    // rather than leaving it as core content
    //
    // Specifically it runs against this asset http://localhost:7080/russian/features-54391793
    // but should pass against any page Story page with 2 or more tweets
    it('Lazy loaded tweets enrich', () => {
      cy.window().then(win => {
        const jsonData = win.SIMORGH_DATA.pageData;

        const blocks = path(['content', 'model', 'blocks'], jsonData);
        const twitterEmbedBlocks = blocks.filter(block => {
          return (
            block.type === 'social_embed' &&
            path(['model', 'blocks', 0, 'type'], block) === 'twitter'
          );
        });

        if (twitterEmbedBlocks.length > 1) {
          const firstTwitterEmbedUrl = path(
            [0, 'model', 'blocks', 0, 'model', 'href'],
            twitterEmbedBlocks,
          );
          const secondTwitterEmbedUrl = path(
            [1, 'model', 'blocks', 0, 'model', 'href'],
            twitterEmbedBlocks,
          );

          cy.get(
            `[data-e2e="twitter-embed-${firstTwitterEmbedUrl}"]`,
          ).scrollIntoView();
          cy.get('.twitter-tweet-rendered').should('have.length', 1);
          cy.get(
            `[data-e2e="twitter-embed-${secondTwitterEmbedUrl}"]`,
          ).scrollIntoView();
          // of.at.least is used here instead of having length of exactly 2
          // so the test does not fail if more than one twitter embed scrolls
          // into view
          cy.get('.twitter-tweet-rendered').should(
            'have.length.of.at.least',
            2,
          );
        } else {
          cy.log('No Social Embed exists');
        }
      });
    });

    it('link should render if exists on page', () => {
      cy.window().then(win => {
        const jsonData = win.SIMORGH_DATA.pageData;

        const hasSocialEmbed = path(
          ['metadata', 'blockTypes'],
          jsonData,
        ).includes('social_embed');

        if (hasSocialEmbed) {
          const blocks = path(['content', 'model', 'blocks'], jsonData);
          const socialEmbed = blocks.filter(
            block => block.type === 'social_embed',
          )[0];

          const socialEmbedData = path(['model', 'blocks', 0], socialEmbed);

          const socialEmbedSource = socialEmbedData.type;
          const socialEmbedUrl = path(['model', 'href'], socialEmbedData);

          cy.get(
            `[data-e2e="${socialEmbedSource}-embed-${socialEmbedUrl}"]`,
          ).scrollIntoView();
          cy.get(`[href^="#skip-${socialEmbedSource}-content"]`).should(
            'exist',
          );
        } else {
          cy.log('No Social Embed exists');
        }
      });
    });
  });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`No testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {});

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {});
};
