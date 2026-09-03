import type { EnvConfig } from '../getEnvConfig';

function setSimorghEnvVars(envVars: EnvConfig) {
  window.SIMORGH_ENV_VARS = envVars;
}

export default setSimorghEnvVars;
