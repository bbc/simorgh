describe('Static Articles data', () => {
  let responseStatus;
  let responseBody;

  const testScenarioResponse = (title, assertion) => {
    it(title, () => {
      assertion();
    });
  };

  beforeEach(() => {
    cy.request(`/data/scenario-01.json`).then(({ status, body }) => {
      responseStatus = status;
      responseBody = body;
    });
  });

  testScenarioResponse('should return a 200 status code', () => {
    expect(responseStatus).to.eq(200);
  });

  describe('Response Body', () => {
    testScenarioResponse('should be an object', () => {
      expect(responseBody).to.be.an('object');
    });

    testScenarioResponse('should contain a blocks object', () => {
      expect(responseBody).to.have.property('blocks');
    });
  });
});
