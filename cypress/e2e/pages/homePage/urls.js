const urls = [
  {
    service: 'kyrgyz',
    local: '/kyrgyz',
    test: '/kyrgyz',
    live: '/kyrgyz',
  },
  {
    service: 'arabic',
    local: '/arabic',
    test: '/arabic',
    live: '/arabic',
  },
  {
    service: 'serbian',
    local: '/serbian/lat',
    test: '/serbian/lat',
  },
  {
    service: 'serbian',
    local: '/serbian/cyr',
    test: '/serbian/cyr',
  },
];

export default () => {
  const serviceToRun = Cypress.env('ONLY_SERVICE');

  if (serviceToRun) {
    return urls.filter(({ service }) => service === serviceToRun);
  }

  return urls;
};
