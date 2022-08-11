import getDataUrl from './getDataUrl';
import visitPage from './visitPage';

export default () => {
  cy.url().then(url => {
    const urlForData = url.replace('.amp', '');

    const firstVisitedPage = url;

    cy.request(getDataUrl(urlForData)).then(({ body }) => {
      // Check if data has topic tags
      const topicTagsPresent = body.metadata.topics;
      let topicTagsLength = 0;

      // Get number of topic tags expected
      if (topicTagsPresent) {
        topicTagsLength = topicTagsPresent.length;
      }

      if (topicTagsPresent && topicTagsLength > 1) {
        // Gets the Topic Tag name
        cy.get(
          `aside[aria-labelledby*='related-topics'] > ul > li:first > a`,
        ).then($tag => {
          const topicTitle = $tag.text();
          cy.wrap(topicTitle).as('topicTitle');
        });
        // Clicks on the first topic tag
        cy.get(`aside[aria-labelledby*='related-topics'] > ul > li > a`)
          .first()
          .click();

        // Checks the page is of the Topic Tag clicked on by checking H1
        cy.get('@topicTitle').then(title => {
          cy.get('h1').should('contain', title);
        });

        // Needs to go back to the first page for the rest of the test suite
        // cy.go('back') does not work on AMP as it returns to a canonical page
        visitPage(firstVisitedPage, 'storyPage');
      } else if (topicTagsPresent && topicTagsLength === 1) {
        cy.get(`aside[aria-labelledby*='related-topics']`)
          .find('a')
          .then($tag => {
            const topicTitle = $tag.text();
            cy.wrap(topicTitle).as('topicTitle');
          });
        // If there is only one topic tag it is not in a list
        cy.get(`aside[aria-labelledby*='related-topics']`).find('a').click();
        // Checks the page is of the Topic Tag clicked on
        cy.get('@topicTitle').then(title => {
          cy.get('h1').should('contain', title);
        });

        cy.visit(firstVisitedPage);
      } else {
        cy.log('No topic tags in json');
      }
    });
  });
};
