/* eslint-disable import/prefer-default-export */
// For testing features that may differ across services but share a common logic e.g. translated strings.
import paths from 'ramda/src/paths';

const getDescription = body => {
  const promoBlock = body.data.article.promo;

  const [topLevelDescription, nestedDescription] = paths(
    [
      ['summary'],
      ['summary', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    ],
    promoBlock,
  );

  return nestedDescription || topLevelDescription;
};

export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${variant} ${pageType}`, () => {
    it('should render a description for the page', () => {
      cy.getPageData({ service, pageType: 'cpsAsset', variant }).then(
        ({ body }) => {
          const description = getDescription(body);
          cy.get('main p').first().should('contain', description);
        },
      );
    });
  });
};
