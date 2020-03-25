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
      const isLegacyAsset = requestPath.split('/').length > 5;

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

    it('should change to the correct script when the script switch is clicked', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const { language } = body.metadata;
        // Accepts privacy policy and cookies (with one click?? will this be flakey?)
        cy.get(
          '#root > header > div.Wrapper-sc-7g3fro-0.fOqUqv > div > ul > li:nth-child(1) > button',
        ).click();
        // This sets up a way of checking the MAP page content is in the right script,
        // regardless of the content input in CPS, as the timstamp should always match the script
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
          const cyrRegex = new RegExp(`${cyrMonths.join('|')}`, 'g');
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
            '#root > header > div > div > div > a > span > span:nth-child(1)',
          ).contains('Ћир');
          // Navigates to a MAP
          cy.contains('/serbian/lat/srbija-23278974').click();

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
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
