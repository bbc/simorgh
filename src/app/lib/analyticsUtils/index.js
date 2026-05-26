import Cookie from 'js-cookie';

import onClient from '#lib/utilities/onClient';

export const getAppType = platform => {
  switch (platform) {
    case 'amp':
      return 'amp';
    case 'app':
      return 'mobile-app';
    case 'lite':
      return 'lite';
    case 'canonical':
      return 'responsive';
    default:
      return 'responsive';
  }
};

export const isLocServeCookieSet = platform => {
  if (platform === 'amp') {
    return false;
  }

  if (onClient()) {
    return !!Cookie.get('loc_serve');
  }

  return null;
};

export const getHref = platform => {
  if (platform === 'amp') {
    return `\${sourceUrl}`;
  }

  if (onClient() && window.location.href) {
    const { href } = window.location;
    return href;
  }

  return null;
};

export const getReferrer = platform => {
  if (platform === 'amp') {
    /* On AMP, `\${documentReferrer}` is an amp analytics variable that resolves
       to a `document.referrer` equivalent as the window document is undefined on amp pages.
       https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#document-referrer
    */
    return `\${documentReferrer}`;
  }

  if (onClient() && document.referrer) {
    return document.referrer;
  }

  return null;
};

export const sanitise = initialString =>
  initialString ? initialString.trim().replace(/\s/g, '%20') : null;

export const LIBRARY_VERSION = 'simorgh';

export const onOnionTld = () =>
  onClient() ? window.location.host.endsWith('.onion') : false;
