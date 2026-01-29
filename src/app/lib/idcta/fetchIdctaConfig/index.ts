import { IDCTA_FETCH_ERROR } from '#app/lib/logger.const';
import nodeLogger from '#app/lib/logger.node';
import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';
import isLocal from '#app/lib/utilities/isLocal';
import { IdctaConfig } from '#app/models/types/account';
import { Toggles, Services } from '#app/models/types/global';
import { getIdctaConfigUrl } from '../getIdctaBaseUrl';

const logger = nodeLogger(__filename);

export default async function fetchIdctaConfig(
  toggles: Toggles,
  service: Services,
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

  const idctaConfigUrl = getIdctaConfigUrl();

  try {
    const response = await fetch(idctaConfigUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const config = await response.json();

    if (!config?.['id-availability']) {
      throw new Error('Invalid config: missing required fields');
    }

    return config;
  } catch (error) {
    logger.error(IDCTA_FETCH_ERROR, {
      url: idctaConfigUrl,
      error,
    });
    return null;
  }
}
