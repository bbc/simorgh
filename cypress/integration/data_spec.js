describe('Static Articles data', () => {
  it('should return a status code of 200', () => {
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

    it('should contain a blocks object', () => {
      cy.request('/data/scenario-01.json').then(({ body }) => {
        expect(body).to.have.property('blocks');
      });
    });
  });
});
