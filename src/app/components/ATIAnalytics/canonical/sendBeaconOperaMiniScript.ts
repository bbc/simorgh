import isOperaProxy from '#app/lib/utilities/isOperaProxy';

const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    const isOperaProxy = ${isOperaProxy.toString()}();
    if (isOperaProxy && !Boolean(window.hasOperaMinScriptRun)) {
      window.hasOperaMinScriptRun = true;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "${atiPageViewUrlString}", true);
      xhr.withCredentials = true;
      xhr.send();
    }
`;

export default sendBeaconOperaMiniScript;
