const urls = [
  {
    service: 'kyrgyz',
    local: '/kyrgyz',
    test: '/kyrgyz',
    live: '/kyrgyz',
  },
];

export default () => {
  const serviceToRun = Cypress.env('ONLY_SERVICE');

  if (serviceToRun) {
    return urls.filter(({ service }) => service === serviceToRun);
  }

  return urls;
};
