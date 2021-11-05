// This is the detection method recommended by opera: https://dev.opera.com/articles/opera-mini-and-javascript/
// Note we do not have reliable access to user-agent based detection due to upstream services not forwarding that header
export default () =>
  Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
