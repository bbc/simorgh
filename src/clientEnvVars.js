const SIMORGH = /^SIMORGH_/i;

module.exports.getClientEnvVars = (
  envConfig = { parsed: {} },
  options = { stringify: true },
) => {
  const { parsed } = envConfig;
  const envVars = Object.keys(parsed);
  const clientEnvVars = {};

  const prefixedEnvVars = envVars.filter(key => SIMORGH.test(key));

  prefixedEnvVars.forEach(variable => {
    clientEnvVars[variable] = options.stringify
      ? JSON.stringify(parsed[variable])
      : parsed[variable];
  });

  return clientEnvVars;
};
