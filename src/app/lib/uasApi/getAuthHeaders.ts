import { getEnvConfig } from '../utilities/getEnvConfig';

const getAuthHeaders = (): HeadersInit => {
  const apiKey = getEnvConfig().SIMORGH_UAS_PUBLIC_API_KEY;

  if (!apiKey) {
    throw new Error('Missing UAS public API key');
  }

  const headers: HeadersInit = {
    'X-API-Key': apiKey,
  };

  return headers;
};

export default getAuthHeaders;
