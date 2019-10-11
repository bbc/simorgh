const services = {
  serbian: {
    font: undefined,
    isWorldService: true,
    variant: [
      {
        lat: {
          pageTypes: {
            articles: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/articles/c805k05kr73o/lat',
              smoke: false,
            },
            errorPage404: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/articles/cabcdefghijo/lat',
              smoke: false,
            },
            frontPage: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/lat',
              smoke: true,
            },
            liveRadio: { path: undefined, smoke: false },
            mediaAssetPage: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/srbija-49427344/lat',
              smoke: false,
            },
          },
        },
      },
      {
        cyr: {
          pageTypes: {
            articles: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/articles/c805k05kr73o/cyr',
              smoke: true,
            },
            errorPage404: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/articles/cabcdefghijo/cyr',
              smoke: true,
            },
            frontPage: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/cyr',
              smoke: true,
            },
            liveRadio: { path: undefined, smoke: false },
            mediaAssetPage: {
              path:
                Cypress.env('APP_ENV') === 'live' ||
                Cypress.env('APP_ENV') === 'test'
                  ? undefined
                  : '/serbian/srbija-49427344/cyr',
              smoke: false,
            },
          },
        },
      },
    ],
  },
};

// Allow runs to be limited to a single service via the CYPRESS_ONLY_SERVICE env var
const runOnlyService = Cypress.env('ONLY_SERVICE');
if (runOnlyService && Object.keys(services).includes(runOnlyService)) {
  module.exports = { [runOnlyService]: services[runOnlyService] };
} else {
  module.exports = services;
}
