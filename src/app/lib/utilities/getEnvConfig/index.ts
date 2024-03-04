import onClient from '#app/lib/utilities/onClient';

export type EnvConfig = typeof SERVER_ENV_VARS;

export const SERVER_ENV_VARS = {
  SIMORGH_APP_ENV: process.env.SIMORGH_APP_ENV,
  SIMORGH_ATI_BASE_URL: process.env.SIMORGH_ATI_BASE_URL,
  SIMORGH_ICHEF_BASE_URL: process.env.SIMORGH_ICHEF_BASE_URL,
  SIMORGH_OPTIMIZELY_SDK_KEY: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
};

export function getEnvConfig(): EnvConfig {
  if (onClient()) {
    return window.SIMORGH_ENV_VARS;
  }

  return SERVER_ENV_VARS;
}

declare global {
  interface Window {
    SIMORGH_ENV_VARS: EnvConfig;
  }
}
