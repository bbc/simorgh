export default () => {
  describe('Live page visit', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    it('visits page and passes', () => {
      cy.visit('/pidgin/live/c7p765ynk9qt?renderer_env=test');
    });
  });
};
