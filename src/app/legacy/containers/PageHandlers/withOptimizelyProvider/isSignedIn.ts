import Cookie from 'js-cookie';
import onClient from '#lib/utilities/onClient';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { TOKEN_COOKIE_NAME } from '#app/lib/uasApi/tokenRefresh/tokenManager';
import isCypress from './isCypress';

const disableOptimizely = process.env.STORYBOOK || isCypress();

const isSignedIn = () => {
  if (disableOptimizely || !onClient() || isOperaProxy()) return false;
  return Boolean(Cookie.get(TOKEN_COOKIE_NAME));
};

export default isSignedIn;
