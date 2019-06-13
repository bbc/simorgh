Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});

// eslint-disable-next-line import/prefer-default-export
export const el = {
  viewport: 'viewport',
  header: 'header',
  section: 'section',
  cookieBanner: 'div#root > div[class^="Wrapper"]',
};
