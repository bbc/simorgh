export default {
  igbo: {
    fontFamily: undefined,
    pageTypes: {
      articles: undefined,
      frontPage: '/igbo',
    },
  },
  news: {
    fontFamily: 'Reith',
    pageTypes: {
      articles: {
        asset:
          Cypress.env('APP_ENV') === 'live' ? 'c5ll353v7y9o' : 'c6v11qzyv8po',
      },
      frontPage: undefined,
    },
  },
  persian: {
    fontFamily: 'Nassim',
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : {
              asset: 'c4vlle3q337o',
            },
      frontPage: undefined,
    },
  },
  pidgin: {
    fontFamily: undefined,
    pageTypes: {
      articles: undefined,
      frontPage: '/pidgin',
    },
  },
  yoruba: {
    fontFamily: undefined,
    pageTypes: {
      articles: undefined,
      frontPage: '/yoruba',
    },
  },
};
