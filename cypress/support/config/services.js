export default {
  // igbo: {
  //   pageTypes: {
  //     articles: undefined,
  //     frontPage: '/igbo',
  //   },
  // },
  news: {
    pageTypes: {
      articles: {
        asset:
          Cypress.env('APP_ENV') === 'live' ? 'c5ll353v7y9o' : 'c6v11qzyv8po',
      },
      frontPage: undefined,
    },
  },
  persian: {
    pageTypes: {
      articles: {
        asset: 'c4vlle3q337o',
      },
      frontPage: undefined,
    },
  // },
  // pidgin: {
  //   pageTypes: {
  //     articles: undefined,
  //     frontPage: '/pidgin',
  //   },
  // },
  // yoruba: {
  //   pageTypes: {
  //     articles: undefined,
  //     frontPage: '/yoruba',
  //   },
      },
};
