import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default () => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      let oldXHROpen = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
          console.log(method, url);
          this.addEventListener('load', function() {
              // do something with the response text
              console.log('load: ' + this.responseText);
          });
          return oldXHROpen.apply(this, arguments);
      }
      window.hasOperaMiniScriptRan = true;
    }
`;
