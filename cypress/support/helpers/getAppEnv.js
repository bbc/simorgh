export default () => {
  const env = Cypress.env('APP_ENV');
  return env === 'stage' ? 'test' : env;
};
