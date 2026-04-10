/* eslint-disable no-unused-expressions */
import SERVICES from '#app/lib/config/services';

export default () => {
  it('all BBC links should contain a World Service', () => {
    cy.get('main a[href^="https://www.bbc.com"]').each($tag => {
      const servicesPattern = SERVICES.join('|');
      const validHrefRegex = new RegExp(
        `^https://www\\.bbc\\.com/(?:${servicesPattern}|programmes/[a-z0-9]{8,15})(?:/.*)?$`,
      );
      const href = $tag.attr('href');
      expect(href).to.exist;
      expect(href).to.not.be.empty;

      expect(href).to.match(validHrefRegex);
    });
  });
};
