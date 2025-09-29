declare namespace Cypress {
  interface Chainable {
    getToggles(serviceID: string): Chainable;
    hasNoscriptImgAtiUrl(atiUrl: string): Chainable;
  }
}
