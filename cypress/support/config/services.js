export default {
  igbo: {
    font: undefined,
    pageTypes: {
      articles: undefined,
      nonExistentarticle:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : {
              asset: 'cxvxrj8tvppo',
            },
      frontPage: '/igbo',
    },
  },
  news: {
    font: 'Reith',
    pageTypes: {
      articles: {
        asset:
          Cypress.env('APP_ENV') === 'live' ? 'c5ll353v7y9o' : 'c6v11qzyv8po',
      },
      nonExistentarticle: {
        asset: 'cxvxrj8tvppo',
      },
      frontPage: undefined,
    },
  },
  persian: {
    font: 'Nassim',
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : {
              asset: 'c4vlle3q337o',
            },
      nonExistentarticle:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : {
              asset: 'cxvxrj8tvppo',
            },
      frontPage: undefined,
    },
  },
  pidgin: {
    font: undefined,
    pageTypes: {
      articles: undefined,
      nonExistentarticle:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : {
              asset: 'cxvxrj8tvppo',
            },
      frontPage: '/pidgin',
    },
  },
  yoruba: {
    font: undefined,
    pageTypes: {
      articles: undefined,
      nonExistentarticle:
        Cypress.env('APP_ENV') === 'live' || Cypress.env('APP_ENV') === 'test'
          ? undefined
          : {
              asset: 'cxvxrj8tvppo',
            },
      frontPage: '/yoruba',
    },
  },
};
