const getAppEnv = () => {
  const env = Cypress.env('APP_ENV');
  return env === 'stage' ? 'test' : env;
};

module.exports = getAppEnv;
