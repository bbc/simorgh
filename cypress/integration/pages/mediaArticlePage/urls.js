const urls = [
  {
    service: 'pidgin',
    local: '/pidgin/articles/cw0x29n2pvqo',
    test: '/pidgin/articles/cvpde7nqj92o',
    live: '/pidgin/articles/cgwk9w4zlg8o',
  },
];

export default () => {
  const serviceToRun = Cypress.env('ONLY_SERVICE');
  if (serviceToRun) {
    return urls.filter(({ service }) => service === serviceToRun);
  }
  return urls;
};
