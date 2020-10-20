// Needed by React 16 https://reactjs.org/docs/javascript-environment-requirements.html
// IE10
import 'core-js/es/map';
import 'core-js/es/set';

// Needed by Styled Components
// IE11, IE10
// import 'core-js/es/symbol';

// Needed by React Loadable
// IE11, IE10
import 'core-js/es/object/assign';

// IE10
import getRandomValues from 'polyfill-crypto.getrandomvalues';

if (!window.crypto && !window.msCrypto) {
  window.crypto = {
    getRandomValues,
  };
}
