/* eslint-disable import/prefer-default-export */
import onClient from '#app/lib/utilities/onClient';

export type EnvConfig = {
  SIMORGH_APP_ENV?: string;
  SIMORGH_ATI_BASE_URL?: string;
  SIMORGH_ICHEF_BASE_URL?: string;
};

export function getEnvConfig(): EnvConfig {
  if (onClient()) {
    console.log('from client');
    return window.simorghEnvVars;
  }

  console.log('from server');
  return {
    SIMORGH_APP_ENV: process.env.SIMORGH_APP_ENV,
    SIMORGH_ATI_BASE_URL: process.env.SIMORGH_ATI_BASE_URL,
    SIMORGH_ICHEF_BASE_URL: process.env.SIMORGH_ICHEF_BASE_URL,
  };
}

declare global {
  interface Window {
    simorghEnvVars: EnvConfig;
  }
}
