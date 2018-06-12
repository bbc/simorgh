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
    }
    return appConfig;
  }
};
