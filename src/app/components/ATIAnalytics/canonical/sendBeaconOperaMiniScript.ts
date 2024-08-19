import isOperaProxy from '#app/lib/utilities/isOperaProxy';

const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMinScriptRan)) {
      window.hasOperaMinScriptRan = true;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "${atiPageViewUrlString}", true);
      xhr.withCredentials = true;
      xhr.send();
    }
`;

export default sendBeaconOperaMiniScript;
