import appConfig from '../../../../../src/server/utilities/serviceConfigs/index';

const assertScriptCookie = (product, cookieValue) => {
  const cookieSuffix = ['ukchina', 'zhongwen'].includes(product)
    ? 'chinese'
    : product;

  cy.getCookie(`ckps_${cookieSuffix}`).should(
    'have.property',
    'value',
    cookieValue,
  );
};

const assertScriptSwitchButton = (product, variantValue) => {
  const scriptToSwitchTo = appConfig[product][variantValue].scriptLink.variant;

  cy.get('header[role="banner"]').within(() => {
    cy.get(`a[data-variant="${scriptToSwitchTo}"]`).should('exist');
  });
};

const assertURLContains = (product, variantValue) => {
  cy.url().should(url => {
    url.includes(`${product}/${variantValue}/`);
  });
};

const assertLang = (serviceName, variantValue) => {
  const expectedLang = appConfig[serviceName][variantValue].lang;
  cy.get('html')
    .should('have.attr', 'lang')
    .then($lang => {
      expect($lang.toLowerCase()).to.equal(expectedLang);
    });
};

export const allVariantAssertions = (serviceName, variantValue) => {
  // Checks correct variant is saved in cookie
  assertScriptCookie(serviceName, variantValue);
  // Assert the script switch button is correct for variant
  assertScriptSwitchButton(serviceName, variantValue);
  // Assert URL contains correct variant
  assertURLContains(serviceName, variantValue);
  // Issue with 'have.property' assertion
  assertLang(serviceName, variantValue);
};

export const nonCookieVariantAssertions = (serviceName, variantValue) => {
  // Assert the script switch button is correct for variant
  assertScriptSwitchButton(serviceName, variantValue);
  // Assert URL contains correct variant
  assertURLContains(serviceName, variantValue);
  // Issue with 'have.property' assertion
  assertLang(serviceName, variantValue);
};
