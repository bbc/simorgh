describe(
  'Live Page Spec',
  {
    env: {
      optionalOvveride: 'foo',
    },
  },
  // @ts-expect-error Conflicts with Jest global types describe, it etc.
  () => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    let livePageData;
    before(() => {
      cy.getPageData({
        service: 'pidgin',
        pageType: 'live',
        id: 'c7p765ynk9qt',
      }).then(({ body }) => {
        livePageData = body;
      });
    });

    if (Cypress.env('APP_ENV') === 'test') {
      it('passes', () => {
        cy.visit('/pidgin/live/c7p765ynk9qt');
      });
    }
  },
);
