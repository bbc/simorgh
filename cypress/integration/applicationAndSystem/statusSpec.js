import config from '../../support/config';

describe('Mozart status', () => {
  it('should not contain the response header X-Mfa set to 1', () => {
    cy.request(`/news/articles/${config.assets.news}`).then(({ headers }) => {
      expect(headers).not.to.have.property('x-mfa');
    });
  });
});
