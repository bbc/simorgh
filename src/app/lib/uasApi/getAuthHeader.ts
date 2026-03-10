import Cookie from 'js-cookie';
import { getEnvConfig } from '../utilities/getEnvConfig';

const getAuthHeaders = (): Record<string, string> => {
  const cknsAtkn = Cookie.get('ckns_atkn');
  if (!cknsAtkn) return {};

  const apiKey = getEnvConfig().UAS_PUBLIC_API_KEY;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${cknsAtkn}`,
    'X-Authentication-Provider': 'idv5',
  };

  if (apiKey) {
    headers['X-API-Key'] = apiKey;
  }
  return headers;
};

export default getAuthHeaders;
