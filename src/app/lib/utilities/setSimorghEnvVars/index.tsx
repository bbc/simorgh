import { EnvConfig } from '../getEnvConfig';

const setSimorghEnvVars = (envVars: EnvConfig) => {
  window.SIMORGH_ENV_VARS = envVars;
};

export default setSimorghEnvVars;
