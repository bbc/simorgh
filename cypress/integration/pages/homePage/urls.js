const urls = [
  {
    service: 'kyrgyz',
    local: '/kyrgyz/tipohome',
    test: '/kyrgyz/tipohome',
    live: null,
  },
];

export default () => {
  const serviceToRun = Cypress.env('ONLY_SERVICE');

  if (serviceToRun) {
    return urls.filter(({ service }) => service === serviceToRun);
  }

  return urls;
};
