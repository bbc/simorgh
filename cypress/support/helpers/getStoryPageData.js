export default async (service, variant) => {
  const env = Cypress.env('APP_ENV');
  if (env !== 'local') {
    // eslint-disable-next-line prefer-destructuring
    const storyId =
      Cypress.env('currentPath').match(/(c[a-zA-Z0-9]{10}o)/)?.[1];

    const bffUrl = `https://web-cdn.${
      env === 'live' ? '' : `${env}.`
    }api.bbci.co.uk/fd/simorgh-bff?pageType=cpsAsset&id=${storyId}&service=${service}${
      variant ? `&variant=${variant}` : ''
    }`;

    cy.log(bffUrl);
    return cy.request({
      url: bffUrl,
      headers: { 'ctx-service-env': env },
    });
  }
  return cy.request(`${Cypress.env('currentPath')}.json`);
};
