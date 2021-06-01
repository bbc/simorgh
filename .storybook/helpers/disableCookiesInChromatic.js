/* eslint-disable no-underscore-dangle, no-restricted-properties */

import isChromatic from 'chromatic/isChromatic';

if (isChromatic()) {
  if (!document.__defineGetter__) {
    Object.defineProperty(document, 'cookie', {
      get: () => '',
      set: () => {},
    });
  } else {
    document.__defineGetter__('cookie', () => '');
    document.__defineSetter__('cookie', () => {});
  }
}
