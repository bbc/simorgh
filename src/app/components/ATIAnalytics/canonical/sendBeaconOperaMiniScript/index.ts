import isOperaProxy from '#app/lib/utilities/isOperaProxy';

const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      window.hasOperaMiniScriptRan = true;

      var atiPageViewUrl = "${atiPageViewUrlString}";
      atiPageViewUrl += document.referrer ? "&ref=" + document.referrer : '';

      var xhr = new XMLHttpRequest();
      xhr.open("GET", atiPageViewUrl, true);
      xhr.withCredentials = true;
      xhr.send();
    }
`;

export default sendBeaconOperaMiniScript;
