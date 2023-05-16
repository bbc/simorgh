const urls = [
  {
    service: 'pidgin',
    localNext: null,
    test: '/pidgin/new_live/c7p765ynk9qt',
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
