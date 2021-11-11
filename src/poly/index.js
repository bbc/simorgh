import './safari-nomodule'; // Safari 10.1 supports modules, but does not support the `nomodule` attribute - https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc

const isLegacyBrowser =
  'noModule' in document.createElement('script') === false;

if (isLegacyBrowser) {
  // Needed by React 16 https://reactjs.org/docs/javascript-environment-requirements.html
  // IE10
  import('core-js/es/map');
  import('core-js/es/set');

  // Needed by Styled Components
  // IE11, IE10
  import('core-js/es/symbol');

  // Needed by React Loadable
  // IE11, IE10
  import('core-js/es/object/assign');

  // Needed by Opera Mini Extreme Mode (we think!)
  import('core-js/es/weak-map');

  // IE10

  import('polyfill-crypto.getrandomvalues').then(getRandomValues => {
    if (!window.crypto && !window.msCrypto) {
      window.crypto = {
        getRandomValues,
      };
    }
  });
}
