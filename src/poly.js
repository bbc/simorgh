import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/symbol';
import 'core-js/fn/typed/uint8-array';
import getRandomValues from 'polyfill-crypto.getrandomvalues';

const cryptoPoly = {
  getRandomValues,
};

if (!window.crypto) {
  window.crypto = cryptoPoly;
}

if (!window.msCrypto) {
  window.msCrypto = cryptoPoly;
}
