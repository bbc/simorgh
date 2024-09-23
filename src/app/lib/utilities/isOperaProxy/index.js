// This is the detection method recommended by opera: https://dev.opera.com/articles/opera-mini-and-javascript/
// Note we do not have reliable access to user-agent based detection due to upstream services not forwarding that header
// This uses the fat function syntax for compatibility reasons, as we use toString() to inline this bit of code for Opera Mini, see https://github.com/bbc/simorgh/pull/11656
// The below line prevents Jest from generating code coverage for this file, due to same inlining with toString() https://github.com/istanbuljs/istanbuljs/issues/499#issuecomment-579815603, https://github.com/istanbuljs/istanbuljs/issues/499#issuecomment-613427710
/* istanbul ignore next */
export default function isOperaProxy() {
  return (
    Object.prototype.toString.call(window.operamini) === '[object OperaMini]'
  );
}
