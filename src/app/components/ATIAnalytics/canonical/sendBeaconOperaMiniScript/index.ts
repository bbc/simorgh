import isOperaProxy from '#app/lib/utilities/isOperaProxy';

const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      window.hasOperaMiniScriptRan = true;

      var atiPageViewUrl = "${atiPageViewUrlString}";
      atiPageViewUrl += document.referrer ? "&ref=" + document.referrer : '';

      window.sendStaticBeacon && window.sendStaticBeacon(atiPageViewUrl)
    }
`;

export default sendBeaconOperaMiniScript;
