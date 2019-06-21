const geoConfig = {
  uk: {
    cookieSensitive: true,
    openGraph: 'https://www.test.bbc.co.uk/news/articles/c6v11qzyv8po',
  },
  ws: {
    cookieSensitive: false,
    openGraph: 'https://www.test.bbc.com/news/articles/c6v11qzyv8po',
  },
};

module.exports =
  typeof Cypress !== 'undefined'
    ? geoConfig[Cypress.env('GEO')]
    : env => geoConfig[env];
