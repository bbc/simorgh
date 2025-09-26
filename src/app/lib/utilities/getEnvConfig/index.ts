import { Environments } from '#app/models/types/global';
import onClient from '../onClient';

export type EnvConfig = ReturnType<typeof getProcessEnvAppVariables>;

// Any environment variables added here will be available to the client and server
export const getProcessEnvAppVariables = () => ({
  SIMORGH_APP_ENV: process.env.SIMORGH_APP_ENV as Environments,
  SIMORGH_ATI_BASE_URL: process.env.SIMORGH_ATI_BASE_URL,
  SIMORGH_BASE_URL: process.env.SIMORGH_BASE_URL,
  SIMORGH_CONFIG_CACHE_ITEMS: process.env.SIMORGH_CONFIG_CACHE_ITEMS,
  SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS:
    process.env.SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS,
  SIMORGH_CONFIG_TIMEOUT_SECONDS: process.env.SIMORGH_CONFIG_TIMEOUT_SECONDS,
  SIMORGH_CONFIG_URL: process.env.SIMORGH_CONFIG_URL,
  SIMORGH_CSP_REPORTING_ENDPOINT: process.env.SIMORGH_CSP_REPORTING_ENDPOINT,
  SIMORGH_ICHEF_BASE_URL: process.env.SIMORGH_ICHEF_BASE_URL,
  SIMORGH_INCLUDES_BASE_URL: process.env.SIMORGH_INCLUDES_BASE_URL,
  SIMORGH_INCLUDES_BASE_AMP_URL: process.env.SIMORGH_INCLUDES_BASE_AMP_URL,
  SIMORGH_MOST_READ_CDN_URL: process.env.SIMORGH_MOST_READ_CDN_URL,
  SIMORGH_OPTIMIZELY_SDK_KEY: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN:
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH:
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
  SIMORGH_REVERB_SOURCE: process.env.SIMORGH_REVERB_SOURCE,
  SIMORGH_WEBVITALS_REPORTING_ENDPOINT:
    process.env.SIMORGH_WEBVITALS_REPORTING_ENDPOINT,
  SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE:
    process.env.SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE,
});

export function getEnvConfig(): EnvConfig {
  // Return window object on client and when window.SIMORGH_ENV_VARS is set
  if (onClient() && window?.SIMORGH_ENV_VARS) {
    return window.SIMORGH_ENV_VARS;
  }

  // Return server side environment variables
  return getProcessEnvAppVariables();
}

declare global {
  interface Window {
    SIMORGH_ENV_VARS: EnvConfig;
  }
}
