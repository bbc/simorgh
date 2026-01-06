import Cookie from 'js-cookie';

export const MARKER_COOKIE_NAME = 'ckns_id';

// TODO: Might be moved to the AccountContext instead
export const isSignedIn = () => {
  if (typeof window === 'undefined') return false;
  return Cookie.get(MARKER_COOKIE_NAME) !== undefined;
};
