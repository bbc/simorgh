// Needed by React 16 https://reactjs.org/docs/javascript-environment-requirements.html
// IE10
import 'core-js/es6/map';
import 'core-js/es6/set';

// Needed by Styled Components
// IE11, IE10
import 'core-js/es6/symbol';

// All IE, Edge < 15, Safari < 10
import 'core-js/modules/es7.string.pad-start';

// IE10
import getRandomValues from 'polyfill-crypto.getrandomvalues';

if (!window.crypto && !window.msCrypto) {
  window.crypto = {
    getRandomValues,
  };
}
