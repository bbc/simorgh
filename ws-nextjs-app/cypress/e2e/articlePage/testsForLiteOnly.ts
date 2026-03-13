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
        cy.get('[data-e2e="to-main-site"] a')
          .should('have.attr', 'href')
          .then($href => {
            cy.get('[data-e2e="to-main-site"] a').click();
            cy.url().should('eq', $href).should('not.contain', '.lite');
          });
        cy.go('back');
      });
      if (hasInformationPageLinkTranslation({ service, variant })) {
        it('Clicking the link to the Information page should navigate to lite site', () => {
          cy.get('[data-e2e="information-page"] a')
            .should('have.attr', 'href')
            .then($href => {
              cy.get('[data-e2e="information-page"] a').click();
              cy.url().should('eq', $href);
            })
            .and('contain', '.lite');
          cy.go('back');
        });
      }
    });
  });
};
