describe('Static Articles data', () => {
  it('should display 200/OK', () => {
    cy.request('/data/scenario-01.json').then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  describe('Response Body', () => {
    it('should be an object', () => {
      cy.request('/data/scenario-01.json').then(({ body }) => {
        expect(body).to.be.an('object');
      });
    });
  });
});
