import nodeLogger from '#app/lib/logger.node';
import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';
import isLocal from '#app/lib/utilities/isLocal';
import type { IdctaConfig } from '#app/models/types/account';
import type { Toggles, Services } from '#app/models/types/global';
import type { IncomingHttpHeaders } from 'http';
import fetchIdctaConfig from '../fetchIdctaConfig';

const logger = nodeLogger(__filename);

/**
 * Gets IDCTA config with toggle validation and config verification
 * @param toggles - Feature toggles
 * @param service - Service name
 * @param requestHeaders - Request headers
 * @returns Validated IdctaConfig with initialIsSignedIn or null
 */

export default async function getIdctaConfig(
  toggles: Toggles,
  service: Services,
  requestHeaders?: IncomingHttpHeaders,
): Promise<IdctaConfig | null> {
  const toggleDefinitions = getToggleDefinitions(toggles);
  const { enabled: isAccountEnabled, value: accountService = '' } =
    toggleDefinitions.account || {};

  const shouldFetchConfig =
    isAccountEnabled &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  if (!shouldFetchConfig) {
    return null;
  }

  const config = await fetchIdctaConfig();

  if (!config) {
    return null;
  }

  if (!config?.['id-availability']) {
    logger.error('Invalid IDCTA config: missing required fields', {
      config,
    });
    return null;
  }

  const signedInHeader = requestHeaders?.['x-id-oidc-signedin'];
  const initialIsSignedIn = signedInHeader === '1';

  return { ...config, initialIsSignedIn };
}
