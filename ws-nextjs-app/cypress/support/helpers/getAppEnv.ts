export default () => {
  const env = Cypress.expose('APP_ENV');
  return env === 'stage' ? 'test' : env;
};
