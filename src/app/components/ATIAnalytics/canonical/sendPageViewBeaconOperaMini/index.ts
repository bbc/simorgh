// type OperaMiniWindow = Window & {
//   hasOperaMiniScriptRan?: boolean;
// };

// function sendPageViewBeaconOperaMini(
//   atiPageViewUrlString: string,
//   isOperaProxyFn: () => boolean,
// ) {
//   const operaMiniWindow = window as OperaMiniWindow;
//   // eslint-disable-next-line no-extra-boolean-cast
//   if (isOperaProxyFn() && !Boolean(operaMiniWindow.hasOperaMiniScriptRan)) {
//     (window as OperaMiniWindow).hasOperaMiniScriptRan = true;

//     const atiPageViewUrl = `${atiPageViewUrlString}${
//       document.referrer ? `&ref=${document.referrer}` : ''
//     }`;

//     window.sendStaticBeacon(atiPageViewUrl);
//   }
// }

// export default sendPageViewBeaconOperaMini;

import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default (atiPageViewUrlString: string) => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      window.hasOperaMiniScriptRan = true;

      var atiPageViewUrl = "${atiPageViewUrlString}";
      atiPageViewUrl += document.referrer ? "&ref=" + document.referrer : '';

      window.sendStaticBeacon(atiPageViewUrl);
    }
`;
