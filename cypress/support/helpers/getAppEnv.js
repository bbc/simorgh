const getAppEnv = () => {
  const env = Cypress.env('APP_ENV') || 'local';
  return env === 'stage' ? 'test' : env;
};

module.exports = getAppEnv;
