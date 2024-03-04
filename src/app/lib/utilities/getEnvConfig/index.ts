import onClient from '#app/lib/utilities/onClient';
import { Environments } from '#app/models/types/global';

export type EnvConfig = ReturnType<typeof initialiseAppEnvVariables>;

// Any environment variables added here will be available to the client and server
export const initialiseAppEnvVariables = () => ({
  SIMORGH_APP_ENV: process.env.SIMORGH_APP_ENV as Environments,
  SIMORGH_ATI_BASE_URL: process.env.SIMORGH_ATI_BASE_URL,
  SIMORGH_ICHEF_BASE_URL: process.env.SIMORGH_ICHEF_BASE_URL,
  SIMORGH_OPTIMIZELY_SDK_KEY: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
});

export function getEnvConfig(): EnvConfig {
  const APP_ENV_VARIABLES = initialiseAppEnvVariables();

  // Return window object on client
  if (onClient()) {
    // Defaulting to APP_ENV_VARIABLES is mainly for tests
    // window.SIMORGH_ENV_VARS is not being set in tests
    return window.SIMORGH_ENV_VARS ?? APP_ENV_VARIABLES;
  }

  // Return APP_ENV_VARIABLES on server
  return APP_ENV_VARIABLES;
}

declare global {
  interface Window {
    SIMORGH_ENV_VARS: EnvConfig;
  }
}
