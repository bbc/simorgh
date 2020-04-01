const SIMORGH = /^SIMORGH_/i;

module.exports.getClientEnvVars = (envConfig = { parsed: {} }) => {
  const { parsed } = envConfig;
  const envVars = Object.keys(parsed);
  const clientEnvVars = {};

  const prefixedEnvVars = envVars.filter((key) => SIMORGH.test(key));

  prefixedEnvVars.forEach((variable) => {
    clientEnvVars[variable] = JSON.stringify(parsed[variable]);
  });

  return clientEnvVars;
};
