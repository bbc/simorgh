describe('Static Articles data', () => {
  const testScenarioRequest = (testTitle, testAssertion) => {
    it(testTitle, () => {
      cy.request(`/data/scenario-01.json`).then(testAssertion);
    });
  };

  testScenarioRequest('should return a 200 status code', ({ status }) => {
    expect(status).to.eq(200);
  });

  describe('Response Body', () => {
    testScenarioRequest('should be an object', ({ body }) => {
      expect(body).to.be.an('object');
    });

    testScenarioRequest('should contain a blocks object', ({ body }) => {
      expect(body).to.have.property('blocks');
    });
  });
});
