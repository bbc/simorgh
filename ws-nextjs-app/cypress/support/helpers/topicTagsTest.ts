export default () => {
  cy.url().then(url => {
    const firstVisitedPage = url;
    cy.get('body').then(bodyElement => {
      if (
        bodyElement.find(`aside[aria-labelledby*='related-topics'] a`).length >
        0
      ) {
        cy.get(`aside[aria-labelledby*='related-topics']`)
          .find('a')
          .first()
          .then($tag => {
            const topicTitle = $tag.text();
            cy.wrap(topicTitle).as('topicTitle');
          });
        // If there is only one topic tag it is not in a list
        cy.get(`aside[aria-labelledby*='related-topics']`)
          .find('a')
          .first()
          .click();
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
