const getParagraphText = blocks => {
  const textReplacements = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  };

  const replacementsRegex = new RegExp(
    Object.keys(textReplacements).join('|'),
    'gi',
  );

  return blocks
    .find(el => el.type === 'paragraph' && el.markupType === 'plain_text')
    .text.replace(replacementsRegex, match => textReplacements[match]);
};

const extractHrefAttribute = textBlock => {
  return textBlock.text.match(/href="([^"]*)/)[1];
};

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    it('should render a H1, which contains/displays a styled headline', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        cy.get('h1').should('contain', body.promo.headlines.headline);
      });
    });

    it('should render a paragraph, which contains/displays styled text', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const textCheck = body.content.blocks.find(
          el => el.type === 'paragraph' && el.markupType === 'plain_text',
        );
        if (textCheck) {
          const text = getParagraphText(body.content.blocks);
          cy.get('p').should('contain', text);
        } else {
          cy.log('No paragraph text present');
        }
      });
    });

    it('legacy MAP should render a link using an <a> with href rather than a plain text <link>', () => {
      const requestPath = Cypress.env('currentPath');
      const isLegacyAsset = requestPath.split('/').length > 4;

      if (isLegacyAsset) {
        cy.request(`${requestPath}.json`).then(({ body }) => {
          const textWithPlainTextLinkTag = body.content.blocks.find(block => {
            return block.text && block.text.includes('</link>');
          });
          if (textWithPlainTextLinkTag) {
            const text = getParagraphText([textWithPlainTextLinkTag]);
            const href = extractHrefAttribute(textWithPlainTextLinkTag);
            cy.get('p')
              .contains(text)
              .should('not.exist');
            cy.get(`a[href*="${href}"]`).should('exist');
          } else {
            cy.log('No </link> - skipping');
          }
        });
      } else {
        cy.log('Not a legacy asset - skipping');
      }
    });

    it('should have href that matches assetURI for 1st related content link', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const numRelatedContentGroups = body.relatedContent.groups.length;

        const requestPath = Cypress.env('currentPath');
        const isLegacyAsset = requestPath.split('/').length > 5;
        if (isLegacyAsset) {
          return cy.log('Test skipped because legacy MAP');
        }

        if (numRelatedContentGroups <= 0) {
          return cy.log('Test skipped because no related content');
        }
        const assetURI =
          body.relatedContent.groups[0].promos[0].locators.assetUri;

        cy.get('li[class^="StoryPromoLi"] > div[class^="StoryPromoWrapper"]')
          .find('h3')
          .within(() => {
            cy.get('a')
              .should('have.attr', 'href')
              .and('include', assetURI);
          });
        return cy.log('Not legacy MAP, has related content');
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
