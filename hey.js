const getConfigUncached = (module, env) => {
  global.Cypress = { env: () => env };
  delete require.cache[require.resolve(module)];
  return require(module);
};

const configs = {
  live: getConfigUncached('./cypress/support/config/services', 'live'),
  test: getConfigUncached('./cypress/support/config/services', 'test'),
  local: getConfigUncached('./cypress/support/config/services', 'local'),
};

const pageType = `mediaAssetPage`;

Object.keys(configs).forEach(config => {
  Object.keys(configs[config]).forEach(service => {
    if (configs[config][service].pageTypes[pageType].path) {
      console.log(
        configs[config][service].pageTypes[pageType].path,
      );
    }
  });
});