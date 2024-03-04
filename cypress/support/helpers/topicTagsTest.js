import getDataUrl from './getDataUrl';
import visitPage from './visitPage';

const getPageData = (url, service, variant, pageType) => {
  const env = Cypress.env('APP_ENV');
  let pageBody;

  const isBffFetch = pageType === 'articles';

  if (!isBffFetch) {
    pageBody = cy.request(getDataUrl(url)).then(({ body }) => body);
  } else {
    const articleId =
      Cypress.env('currentPath').match(/(c[a-zA-Z0-9]{10}o)/)?.[1];

    const bffUrl = `https://web-cdn.${
      env === 'live' ? '' : `${env}.`
    }api.bbci.co.uk/fd/simorgh-bff?pageType=article&id=${articleId}&service=${service}${
      variant !== 'default' ? `&variant=${variant}` : ''
    }`;

    cy.log(bffUrl);
    pageBody = cy
      .request({
        url: bffUrl,
        headers: { 'ctx-service-env': env },
      })
      .then(({ body }) => body);
  }

  return pageBody;
};

export default (service, variant, pageType) => {
  cy.url().then(url => {
    const urlForData = url.replace('.amp', '');

    const firstVisitedPage = url;
    getPageData(urlForData, service, variant, pageType).then(body => {
      let pageBody;

      if (pageType === 'articles') {
        pageBody = body.data.article;
      } else {
        pageBody = body;
      }

      // Check if data has topic tags
      const topicTagsPresent = pageBody.metadata.topics;
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
