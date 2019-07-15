export default {
  igbo: {
    pageTypes: {
      articles: undefined,
      fontStartsWith: undefined,
      frontPage: '/igbo',
    },
  },
  news: {
    pageTypes: {
      articles: {
        asset:
          Cypress.env('APP_ENV') === 'live' ? 'c5ll353v7y9o' : 'c6v11qzyv8po',
      },
      fontStartsWith: 'Reith',
      frontPage: undefined,
    },
  },
  persian: {
    pageTypes: {
      articles:
        Cypress.env('APP_ENV') === 'live'
          ? undefined
          : {
              asset: 'c4vlle3q337o',
            },
      fontStartsWith: 'Nassim',      
      frontPage: undefined,
    },
  },
  pidgin: {
    pageTypes: {
      articles: undefined,
      fontStartsWith: undefined,
      frontPage: '/pidgin',
    },
  },
  yoruba: {
    pageTypes: {
      articles: undefined,
      fontStartsWith: undefined,
      frontPage: '/yoruba',
    },
  },
};
