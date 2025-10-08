/* eslint-disable no-unused-expressions */
import { allServices } from '#app/routes/utils/regex';

export default () => {
  it('all BBC links should contain a World Service', () => {
    const allowedUrls = [
      'programmes/p0703hz7', // present on https://www.bbc.com/persian/topics/cw9qgeqd1zqt & redirects to https://www.bbc.com/persian/podcasts/p0703hz7
    ];

    cy.get('main a[href^="https://www.bbc.com"]').each($tag => {
      const servicesPattern = allServices.join('|');
      const servicesRegex = new RegExp(
        `^https://www\\.bbc\\.com/(?:${servicesPattern})(?:/.*)?$`,
      );
      const href = $tag.attr('href');
      expect(href).to.exist;
      expect(href).to.not.be.empty;

      const isAllowed = allowedUrls.some(url => href.includes(url));

      if (!isAllowed) {
        expect(href).to.match(servicesRegex);
      }
    });
  });
};
