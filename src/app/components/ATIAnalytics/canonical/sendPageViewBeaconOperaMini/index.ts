// import isOperaProxy from '#app/lib/utilities/isOperaProxy';

// export default (atiPageViewUrlString: string) => `
//     if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
//       window.hasOperaMiniScriptRan = true;

//       var atiPageViewUrl = "${atiPageViewUrlString}";
//       atiPageViewUrl += document.referrer ? "&ref=" + document.referrer : '';

//       window.sendStaticBeacon(atiPageViewUrl);
//     }
// `;

type OperaMiniWindow = Window & {
  hasOperaMiniScriptRan?: boolean;
};

// eslint-disable-next-line func-names
const sendPageViewBeaconOperaMini = function (
  atiPageViewUrlString: string,
  isOperaProxyFn: () => boolean,
) {
  // eslint-disable-next-line func-names, no-var
  var operaMiniWindow = window as OperaMiniWindow;

  if (isOperaProxyFn() && !operaMiniWindow.hasOperaMiniScriptRan) {
    (window as OperaMiniWindow).hasOperaMiniScriptRan = true;

    // eslint-disable-next-line vars-on-top, no-var
    var atiPageViewUrl = `${atiPageViewUrlString}`;
    // eslint-disable-next-line prefer-template
    atiPageViewUrl += document.referrer ? '&ref=' + document.referrer : '';

    window.sendStaticBeacon(atiPageViewUrl);
  }
};

export default sendPageViewBeaconOperaMini;
