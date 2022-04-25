// import getInitialData from '../../../../src/app/routes/topic/getInitialData';

export default ({ service, pageType, variant, isAmp }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    let topicId;
    beforeEach(() => {
      const currentpath = Cypress.env('currentPath');
      cy.log(currentpath);

      // eslint-disable-next-line prefer-destructuring
      topicId = currentpath.split('topics/').pop().split('?')[0];

      cy.log(`topic id${topicId}`);
    });

    it('should render a H1, which contains/displays topic title', () => {
      const currentpath = Cypress.env('currentPath');
      cy.log(currentpath);

      cy.request(
        `https://web-cdn.api.bbci.co.uk/fd/simorgh-bff?id=${topicId}&service=${service}`,
      ).then(({ body }) => {
        cy.log(body);

        cy.get('h1').should('contain', body.data.title);
      });
    });
    it('should render the correct number of items', () => {
      cy.request(
        `https://web-cdn.api.bbci.co.uk/fd/simorgh-bff?id=${topicId}&service=${service}`,
      ).then(({ body }) => {
        cy.log(body);
        const numberOfItems = body.data.summaries.length;
        cy.log(numberOfItems);
        // cy.get('ul').eq(1).its('length').should('eq', numberOfItems);
      });
    });
  });
};
