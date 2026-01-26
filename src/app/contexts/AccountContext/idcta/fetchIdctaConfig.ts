import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';
import isLocal from '#app/lib/utilities/isLocal';
import { Toggles, Services } from '#app/models/types/global';
import { getIdctaConfigUrl } from './getIdctaBaseUrl';

export type IdctaConfigFetchResult = {
  ok: boolean;
  status: number;
  statusText: string;
  body: unknown | null;
};

export default async function fetchIdctaConfig(
  toggles: Toggles,
  service: Services,
): Promise<IdctaConfigFetchResult | null> {
  const toggleDefinitions = getToggleDefinitions(toggles);
  const { enabled: isAccountEnabled, value: accountService = '' } =
    toggleDefinitions.account || {};

  // TODO: Improve
  const shouldFetchConfig = isLocal()
    ? isAccountEnabled && accountService?.toString().includes(service)
    : isAccountEnabled;

  if (!shouldFetchConfig) {
    return null;
  }
  const idctaConfigUrl = getIdctaConfigUrl();

  try {
    const response = await fetch(idctaConfigUrl, {
      cache: 'no-store',
    });

    const body = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      body,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      statusText:
        error instanceof Error ? error.message : 'Failed to fetch IDCTA config',
      body: null,
    };
  }
}
