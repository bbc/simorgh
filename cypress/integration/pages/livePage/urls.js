const urls = [
  {
    service: 'pidgin',
    localNext: '/pidgin/new_live/c7p765ynk9qt',
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
