import { getEnvConfig } from '../utilities/getEnvConfig';

const getAuthHeaders = (): Record<string, string> => {
  const apiKey = getEnvConfig().SIMORGH_UAS_PUBLIC_API_KEY;

  if (!apiKey) {
    throw new Error('Missing UAS public API key');
  }

  const headers: Record<string, string> = {
    'X-API-Key': apiKey,
  };

  return headers;
};

export default getAuthHeaders;
