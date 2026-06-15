import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default (atiPageViewUrlString: string) => {
  if (isOperaProxy() && !Boolean((window as any).hasOperaMiniScriptRan)) {
    (window as any).hasOperaMiniScriptRan = true;

    const atiPageViewUrl =
      atiPageViewUrlString +
      (document.referrer ? '&ref=' + document.referrer : '');

    window.sendStaticBeacon(atiPageViewUrl);
  }
};
