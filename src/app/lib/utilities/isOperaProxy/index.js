// This is the detection method recommended by opera: https://dev.opera.com/articles/opera-mini-and-javascript/
// Note we do not have reliable access to user-agent based detection due to upstream services not forwarding that header
// This uses the fat function syntax for compatibility reasons, as we use toString() to inline this bit of code for Opera Mini, see https://github.com/bbc/simorgh/pull/11656
export default function isOperaProxy() {
  return (
    Object.prototype.toString.call(window.operamini) === '[object OperaMini]'
  );
}
