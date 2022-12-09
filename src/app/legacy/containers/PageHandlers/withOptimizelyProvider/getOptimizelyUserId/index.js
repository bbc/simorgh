import onClient from '#lib/utilities/onClient';
import isOperaProxy from '#lib/utilities/isOperaProxy';
import { v4 as uuid } from 'uuid';
import Cookie from 'js-cookie';

const getOptimizelyUserId = () => {
  // Users accessing the site on opera "extreme data saving mode" have the pages rendered by an intermediate service
  // Attempting to track these users is just tracking that proxy, causing all opera mini visitors to have the same id
  if (!onClient() || isOperaProxy()) return null;

  const cookieName = 'ckns_mvt';
  const cookieValue = Cookie.get(cookieName);
  const expires = 365; // expires in 12 Months

  if (!cookieValue) {
    const cookieUuid = uuid();
    Cookie.set(cookieName, cookieUuid, { expires, path: '/', secure: true });
    return cookieUuid;
  }

  return cookieValue;
};

export default getOptimizelyUserId;
