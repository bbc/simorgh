import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/symbol';
import 'core-js/fn/typed/uint8-array';
import getRandomValues from 'polyfill-crypto.getrandomvalues';

if (!window.crypto && !window.msCrypto) {
  window.crypto = {
    getRandomValues,
  };
}
