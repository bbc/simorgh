import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default (atiPageViewUrlString: string) => `
    console.log("CHECK IS OPERA", ${isOperaProxy.toString()}())
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      window.hasOperaMiniScriptRan = true;

      var atiPageViewUrl = "${atiPageViewUrlString}";
      atiPageViewUrl += document.referrer ? "&ref=" + document.referrer : '';
      console.log("CHECK", ${atiPageViewUrlString});
      window.sendStaticBeacon(atiPageViewUrl);
    }
`;
