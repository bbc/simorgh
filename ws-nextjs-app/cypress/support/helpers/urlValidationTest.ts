/* eslint-disable no-unused-expressions */
import SERVICES from '#app/lib/config/services';

const SERVICES_PATTERN = SERVICES.join('|');

const VALID_HREF_REGEX = new RegExp(
  `^https://www\\.bbc\\.com/(?:${SERVICES_PATTERN}|programmes/[a-z0-9]{8,15})(?:/.*)?$`,
);

export default () => {
  it('all links within <main> element should be a valid World Service URL', () => {
    cy.get('main')
      .find('a[href^="https://www.bbc.com"]')
      .each($tag => {
        const href = $tag.attr('href');

        expect(href).to.exist;
        expect(href).to.not.be.empty;
        expect(href).to.match(VALID_HREF_REGEX);
      });
  });
};
