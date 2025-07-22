import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default (atiPageViewUrlString: string) => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      window.hasOperaMiniScriptRan = true;

      var atiPageViewUrl = "${atiPageViewUrlString}";

      window.sendStaticBeacon(atiPageViewUrl);
    }
`;
