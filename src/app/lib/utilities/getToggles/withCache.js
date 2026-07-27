import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import getToggles from '.';

const { WEB_CDN_URL } = getEnvConfig();
const AMP_TOGGLES_ENDPOINT = `${WEB_CDN_URL}/fd/ws-toggles`;

/**
 * @param {{ service: string, pagePath: string, isAmp?: boolean }} params
 */
const withCache = async ({ service, pagePath, isAmp = false }) => {
  if (!isAmp) {
    return getToggles({ service, pagePath });
  }

  const [simorghToggles, ampToggles] = await Promise.all([
    getToggles({
      service,
      pagePath,
      isAmp,
      overrideEndpoint: AMP_TOGGLES_ENDPOINT,
    }),
    getToggles({
      service,
      pagePath,
      isAmp,
      overrideEndpoint: AMP_TOGGLES_ENDPOINT,
    }),
  ]);

  return { ...simorghToggles, ...ampToggles };
};

export default withCache;
