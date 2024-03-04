import onClient from '#app/lib/utilities/onClient';

export type EnvConfig = typeof APP_ENV_VARIABLES;

// Any environment variables added here will be available to the client and server
export const APP_ENV_VARIABLES = {
  SIMORGH_APP_ENV: process.env.SIMORGH_APP_ENV,
  SIMORGH_ATI_BASE_URL: process.env.SIMORGH_ATI_BASE_URL,
  SIMORGH_ICHEF_BASE_URL: process.env.SIMORGH_ICHEF_BASE_URL,
  SIMORGH_OPTIMIZELY_SDK_KEY: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
};

export function getEnvConfig(): EnvConfig {
  if (onClient()) {
    return window.SIMORGH_ENV_VARS;
  }

  return APP_ENV_VARIABLES;
}

declare global {
  interface Window {
    SIMORGH_ENV_VARS: EnvConfig;
  }
}
