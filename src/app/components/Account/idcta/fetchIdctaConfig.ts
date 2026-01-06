import { getIdctaConfigUrl } from './getIdctaBaseUrl';

export type IdctaConfigFetchResult = {
  // TODO: Extra fields temp for testing
  ok: boolean;
  status: number;
  statusText: string;
  body: unknown | null;
};

export default async function fetchIdctaConfig(): Promise<IdctaConfigFetchResult> {
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
