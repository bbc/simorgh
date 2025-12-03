import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import appConfig from '#src/server/utilities/serviceConfigs';
import { ServiceParametersType } from '../../types';

export const hasInformationPageLinkTranslation = ({
  service,
  variant = 'default',
}: ServiceParametersType) => {
  return appConfig[service][variant]?.translations?.liteSite
    ?.informationPageLink;
};

export default ({ service, pageType, variant }: ServiceParametersType) => {
  describe(`Running testsForLiteOnly for ${service} ${pageType}`, () => {
    describe('Lite Site Summary', () => {
      it('Clicking the link to the main site should navigate to canonical site', () => {
        cy.get('[data-e2e="to-main-site"]').within(() => {
          cy.get('a')
            .should('have.attr', 'href')
            .then($href => {
              cy.get('a').click();
              cy.url().should('eq', $href).should('not.contain', '.lite');
            });
        });
        cy.go('back');
      });
      if (
        pageType !== MEDIA_ASSET_PAGE &&
        hasInformationPageLinkTranslation({ service, variant })
      ) {
        it('Clicking the link to the Information page should navigate to lite site', () => {
          cy.get('[data-e2e="information-page"]').within(() => {
            cy.get('a')
              .should('have.attr', 'href')
              .then($href => {
                cy.get('a').click();
                cy.url().should('eq', $href);
              })
              .and('contain', '.lite');
          });
          cy.go('back');
        });
      }
    });
  });
};
