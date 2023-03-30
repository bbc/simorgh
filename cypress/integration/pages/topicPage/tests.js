export default ({ service, pageType, variant }) => {
  let topicId;
  let variantTopicId;
  let topicTitle;
  let firstItemHeadline;
  let pageCount;
  let numberOfItems;
  let appendVariant = '';
  let messageBanner;
  const scriptSwitchServices = ['serbian', 'ukchina', 'zhongwen'];
  let otherVariant;
  describe(`Tests for ${service} ${pageType}`, () => {
    beforeEach(() => {
      cy.log(Cypress.env('currentPath'));
      cy.log(service);
      const env = Cypress.env('APP_ENV');
      if (env !== 'local') {
        // eslint-disable-next-line prefer-destructuring
        topicId = Cypress.env('currentPath')
          .split('topics/')
          .pop()
          .split('?')[0];

        if (scriptSwitchServices.includes(service)) {
          appendVariant = `&variant=${variant}`;
          if (service === 'serbian') {
            otherVariant = variant === 'lat' ? 'cyr' : 'lat';
          }
          if (service === 'ukchina' || service === 'zhongwen') {
            otherVariant = variant === 'simp' ? 'trad' : 'simp';
          }
        }

        const requestObject = {
          method: 'GET',
          url: `https://web-cdn.${
            env === 'live' ? '' : `${env}.`
          }api.bbci.co.uk/fd/simorgh-bff?page=1&id=${topicId}&service=${service}${appendVariant}&pageType=topic`,
        };

        if (Cypress.env('currentPath').includes('?renderer_env=test')) {
          requestObject.headers = { 'ctx-service-env': 'test' };
        }

        // Gets the topic page data for all the tests
        cy.request(requestObject).then(({ body }) => {
          topicTitle = body.data.title;
          variantTopicId = body.data.variantTopicId;
          pageCount = body.data.pageCount;
          numberOfItems = body.data.curations[0].summaries.length;
          firstItemHeadline = body.data.curations[0].summaries[0].title;
          messageBanner = body.data.curations.find(
            curation =>
              curation.visualProminence === 'NORMAL' &&
              curation.visualStyle === 'BANNER',
          );
        });
        cy.log(`topic id ${topicId}`);
      }
      cy.clearLocalStorage();
    });

    describe(`Page content`, () => {
      it('should render a H1, which contains/displays topic title', () => {
        cy.log(Cypress.env('currentPath'));

        cy.get('h1').should('contain', topicTitle);
      });
      it('should render the correct number of items', () => {
        // Print SIMORGH_DATA if the number of promos on the page does not match
        // the number of promos in the data from the BFF
        // This is to help find out why sometimes a promo doesn't show on the page
        cy.log(`Number of promos in BFF data${numberOfItems}`);
        const selector = '[data-testid="topic-promos"]:first > li';
        const promoCount = Cypress.$(selector).length;
        cy.log(`Number of promos on the page${promoCount}`);

        if (promoCount !== numberOfItems) {
          cy.window().then(win => {
            const pageData = win.SIMORGH_DATA;

            cy.log(pageData);
          });
        }

        // Checks number of items on page
        cy.get('[data-testid="topic-promos"]')
          .first()
          .children()
          .its('length')
          .should('eq', numberOfItems);
      });
      it.skip('First item has correct headline', () => {
        cy.log(firstItemHeadline);
        // Goes down into the first item's h2 text and compares to title
        cy.get('[data-testid="topic-promos"]')
          .first()
          .children()
          .first()
          .within(() => {
            cy.get('h2').should('have.text', firstItemHeadline);
          });
      });
      it('Clicking the first item should navigate to the correct page (goes to live article)', () => {
        // Goes down into the first item's href
        cy.get('[data-testid="topic-promos"]')
          .first()
          .children()
          .first()
          .within(() => {
            cy.get('a')
              .should('have.attr', 'href')
              .then($href => {
                cy.get('a').click();
                cy.url().should('eq', $href);
              });
          });
      });
      it('clicking the message banner should navigate to the correct page', () => {
        if (messageBanner) {
          cy.go('back');
          cy.get(
            `[data-testid="${`message-banner-${messageBanner.title.replaceAll(
              ' ',
              '-',
            )}`}"]`,
          )
            .scrollIntoView()
            .should('exist')
            .within(() => {
              cy.get('a')
                .should('have.attr', 'href')
                .then($href => {
                  cy.log($href);
                  cy.get('a').click();
                  cy.url().should('eq', messageBanner.summaries[0].link);
                });
            });
        } else {
          cy.log('No Message Banner exist on Page!');
        }
      });
    });
    describe(`Pagination`, () => {
      it('should show pagination if there is more than one page', () => {
        // First return to the topics page. Last test has page on article
        cy.go('back');
        cy.log(`pagecount is ${pageCount}`);
        // Checks pagination only is on page if there is more than one page
        if (pageCount > 1) {
          cy.get('[data-testid="topic-pagination"]').should('exist');
        } else {
          cy.get('[data-testid="topic-pagination"]').should('not.exist');
        }
      });
      it('should have the correct max pagination number', () => {
        // Gets last pagination element and checks the number is the length of pageCount
        if (pageCount > 1) {
          cy.log(`pagecount is ${pageCount}`);
          cy.get('[data-testid="topic-pagination"] li')
            .last()
            .should('have.text', pageCount);
        } else {
          cy.log('No pagination - only 1 page of items');
        }
      });

      it('Page 2 button navigates to 2nd page', () => {
        if (pageCount > 1) {
          cy.get('[data-testid="topic-pagination"] > ul > li')
            .first()
            .next()
            .click();

          cy.url().should('include', '?page=2');
          cy.get('[data-testid="topic-promos"] li');
        } else {
          cy.log('No pagination as there is only one page');
        }
      });
      it('Page 2 does not have a fallback response', () => {
        const expectedContentType = 'text/html';
        const isErrorPage = pageType.includes('error');
        const expectedStatus = isErrorPage ? 404 : 200;
        // const failOnStatusCode = !isErrorPage;
        cy.url().then(url => {
          const path = url;
          cy.testResponseCodeAndType({
            path,
            responseCode: expectedStatus,
            type: expectedContentType,
          });
        });
      });
      it('Next button navigates to next page (3)', () => {
        if (pageCount > 2) {
          cy.get('[id="pagination-next-page"]').click();
          cy.url().should('include', `?page=3`);
          cy.get('[data-testid="topic-promos"] li');
        } else {
          cy.log('No next button when on page 2 of 2');
        }
      });
      it('Last page number button navigates to last page', () => {
        if (pageCount > 1) {
          cy.get('[data-testid="topic-pagination"] > ul > li').last().click();
          cy.url().should('include', `?page=${pageCount}`);
          cy.get('[data-testid="curation-grid-normal"]');
        } else {
          cy.log('No pagination as there is only one page');
        }
      });
      it('Previous page button navigates to previous page (second to last)', () => {
        if (pageCount > 1) {
          cy.get('[data-testid="topic-pagination"] > span > a').click();
          cy.url().should('include', `?page=${pageCount - 1}`);
          cy.get('[data-testid="topic-pagination"] > ul > li').first().click();
          cy.url().should('include', `?page=1`);
          cy.get('[data-testid="topic-promos"] li');
        } else {
          cy.log('No pagination as there is only one page');
        }
      });
      it('Page 1 button navigates to page 1', () => {
        if (pageCount > 1) {
          cy.get('[data-testid="topic-pagination"] > ul > li').first().click();
          cy.url().should('include', `?page=1`);
          cy.get('[data-testid="topic-promos"] li');
        } else {
          cy.log('No pagination as there is only one page');
        }
      });
      it('Above 400px does not show Page x of y', () => {
        if (pageCount > 1) {
          cy.get('[data-testid="topic-pagination-summary"]').should(
            'not.be.visible',
          );
        } else {
          cy.log('No pagination as there is only one page');
        }
      });
      it('Below 400px shows Page x of y', () => {
        if (pageCount > 1) {
          cy.viewport(320, 480);
          cy.get('[data-testid="topic-pagination-summary"]').should(
            'be.visible',
          );
        } else {
          cy.log('No pagination as there is only one page');
        }
      });
    });
    describe(`Script switch`, () => {
      it('Pages with 2 scripts should have a script switch button with correct other variant', () => {
        if (scriptSwitchServices.includes(service)) {
          cy.get(`[data-variant="${otherVariant}"]`).should('be.visible');
        } else {
          cy.log('Not a script switch service');
        }
        cy.log(Cypress.env('currentPath'));
      });
      it('Script switch button switches the script', () => {
        if (scriptSwitchServices.includes(service)) {
          // clicks script switch
          cy.get(`[data-variant="${otherVariant}"]`).click();
          // URL contains correct variant after click
          cy.url().should('contain', otherVariant);
          // URL contains the correct topic ID
          cy.url().should('contain', variantTopicId);

          // clicks script switch
          cy.get(`[data-variant="${variant}"]`).click();
          // URL contains correct variant after click
          cy.url().should('contain', variant);
          // URL contains the correct topic ID
          cy.url().should('contain', topicId);
        } else {
          cy.log('Not a script switch service');
        }
      });
    });
  });
};
