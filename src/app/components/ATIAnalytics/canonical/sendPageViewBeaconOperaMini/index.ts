import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default (atiPageViewUrlString: string) => {
  if (isOperaProxy() && !Boolean((window as any).hasOperaMiniScriptRan)) {
    (window as any).hasOperaMiniScriptRan = true;

    var atiPageViewUrl = atiPageViewUrlString;
    atiPageViewUrl += document.referrer ? '&ref=' + document.referrer : '';

    window.sendStaticBeacon(atiPageViewUrl);
  }
};
