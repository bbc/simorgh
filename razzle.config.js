module.exports = {
  modify: (config, { dev }) => {
    const appConfig = config;

    if (!dev) {
      /*
        This is a hack to disable linting on the production build.
        Linting is the first object in the rules away and this removes it.
        A prod build will fail if the API changes so it is fairly safe.
      */
      appConfig.module.rules.shift();

      const requireMap = {
        'jquery-1.9': '../vendor/jquery-1.9.1',
        'bump-3': '../vendor/bump-3',
      };

      appConfig.resolve.alias = Object.assign({}, requireMap);
    }
    return appConfig;
  },
};
