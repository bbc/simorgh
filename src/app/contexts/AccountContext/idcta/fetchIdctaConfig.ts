import { IDCTA_FETCH_ERROR } from '#app/lib/logger.const';
import nodeLogger from '#app/lib/logger.node';
import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';
import isLocal from '#app/lib/utilities/isLocal';
import { Toggles, Services } from '#app/models/types/global';
import { getIdctaConfigUrl } from './getIdctaBaseUrl';

const logger = nodeLogger(__filename);

// TODO: Add types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IdctaConfig = any;

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
      logger.error(IDCTA_FETCH_ERROR, {
        url: idctaConfigUrl,
        service,
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }

    return await response.json();
  } catch (error) {
    logger.error(IDCTA_FETCH_ERROR, {
      url: idctaConfigUrl,
      service,
      error,
    });
    return null;
  }
}
