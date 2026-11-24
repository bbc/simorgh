type OperaMiniWindow = Window & {
  hasOperaMiniScriptRan?: boolean;
};

// eslint-disable-next-line func-names
export default function (
  atiPageViewUrlString: string,
  isOperaProxyFn: () => boolean,
) {
  if (isOperaProxyFn() && !(window as OperaMiniWindow).hasOperaMiniScriptRan) {
    (window as OperaMiniWindow).hasOperaMiniScriptRan = true;

    // eslint-disable-next-line vars-on-top, no-var
    var atiPageViewUrl = atiPageViewUrlString;
    // eslint-disable-next-line prefer-template
    atiPageViewUrl += document.referrer ? '&ref=' + document.referrer : '';

    window.sendStaticBeacon(atiPageViewUrl);
  }
}
