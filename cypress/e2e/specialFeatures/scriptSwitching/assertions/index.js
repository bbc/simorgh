import serviceConfigs from '../../../../../src/server/utilities/serviceConfigs';

import {
  clickScriptSwitcher,
  clickHomePageLink,
  clickPromoLinkOnHomePage,
} from '../helpers';

const assertScriptSwitchButton = (service, variant) => {
  const { scriptLink } = serviceConfigs[service][variant];
  const { text: scriptToSwitchToText, variant: scriptToSwitchTo } = scriptLink;

  cy.contains(scriptToSwitchToText, { matchCase: false });
  cy.get('header[role="banner"]')
    .first()
    .within(() => {
      cy.get(`a[data-variant="${scriptToSwitchTo}"]`).should('exist');
    });
};

const assertURLContains = (service, variant) => {
  cy.url().should(url => {
    url.includes(`${service}/${variant}/`);
  });
};

const assertLang = (service, variant) => {
  const expectedLang = serviceConfigs[service][variant].lang;
  cy.get('html')
    .should('have.attr', 'lang')
    .then($lang => {
      expect($lang.toLowerCase()).to.equal(expectedLang);
    });
};

const allVariantAssertions = (service, variant) => {
  // Assert the script switch button is correct for variant
  cy.log('assertScriptSwitchButton');
  assertScriptSwitchButton(service, variant);
  // Assert URL contains correct variant
  cy.log('assertURLContains');
  assertURLContains(service, variant);
  // Issue with 'have.property' assertion
  cy.log('assertLang');
  assertLang(service, variant);
};

export default ({ service, pageType, variant, otherVariant }) => {
  describe(`Script Switching`, () => {
    it(`should change to the correct script when switching script from ${variant} to ${otherVariant}`, () => {
      cy.log(
        `Asserting script switch button, url and document lang for variant: ${variant}`,
      );
      allVariantAssertions(service, variant);

      // Clicks script switcher
      clickScriptSwitcher(otherVariant);

      cy.log(
        `Asserting script switch button, url and document lang for other variant: ${otherVariant}`,
      );
      allVariantAssertions(service, otherVariant);

      // Navigate to home page by clicking link in the banner
      clickHomePageLink(service, otherVariant);

      cy.log(
        `Asserting script switch button, url and document lang has persisted for other variant: ${otherVariant}`,
      );
      allVariantAssertions(service, otherVariant);

      // Finding a link to click on the home page
      clickPromoLinkOnHomePage(pageType);

      cy.log(
        `Asserting script switch button, url and document lang has persisted for other variant: ${otherVariant}`,
      );
      allVariantAssertions(service, otherVariant);

      // Clicks script switcher to original variant
      clickScriptSwitcher(variant);

      cy.log(
        `Asserting script switch button, url and document lang have changed after clicking script switcher to ${variant}`,
      );
      allVariantAssertions(service, variant);
    });
  });
};
