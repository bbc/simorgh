import Cookie from 'js-cookie';
import { getEnvConfig } from '../utilities/getEnvConfig';

const getAuthHeaders = (): Record<string, string> => {
  const cknsAtkn = Cookie.get('ckns_atkn');
  const apiKey = getEnvConfig().SIMORGH_UAS_PUBLIC_API_KEY;

  if (!cknsAtkn || !apiKey) {
    throw new Error('Missing authentication for UAS request');
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${cknsAtkn}`,
    'X-Authentication-Provider': 'idv5',
    'X-API-Key': apiKey,
  };

  return headers;
};

export default getAuthHeaders;
