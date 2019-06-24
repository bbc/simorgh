import config from '../support/config';

[
  { service: 'news', url: `/news/articles/${config.assets.news}` },
  {
    service: 'persian',
    url: `/persian/articles/${config.assets.persian}`,
  },
  { service: 'igbo', url: `/igbo` },
  { service: 'yoruba', url: `/yoruba` },
  { service: 'pidgin', url: `/pidgin` },
].forEach(({ service, url }) => {
  describe(`Script src - ${service}`, () => {
    beforeEach(() => {
      cy.visit(url);
    });

    it('should have script srcs for service', () => {
      cy.onLocal(() => {
        cy.get('script[src]').each($p =>
          expect($p.attr('src')).to.match(
            new RegExp(
              `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
              'g',
            ),
          ),
        );
      });
    });
  });
});
