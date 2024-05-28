import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export function sendBeaconOperaMini(atiPageViewUrlString) {
  if (isOperaProxy()) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', atiPageViewUrlString, true);
    xhr.withCredentials = true;
    xhr.send();
  }
}

export function sendBeaconOperaMiniAsString(atiPageViewUrlString) {
  let sendBeaconOperaMiniString = sendBeaconOperaMini.toString();

  sendBeaconOperaMiniString = sendBeaconOperaMiniString.replace(
    'atiPageViewUrlString',
    '',
  );
  sendBeaconOperaMiniString = sendBeaconOperaMiniString.replace(
    'atiPageViewUrlString',
    `'${atiPageViewUrlString}'`,
  );

  const ifExpression = sendBeaconOperaMiniString
    .split('if (')[1]
    .split(') {')[0];
  sendBeaconOperaMiniString = sendBeaconOperaMiniString.replace(
    ifExpression,
    `${isOperaProxy.toString()}()`,
  );

  sendBeaconOperaMiniString = `${sendBeaconOperaMiniString} \n sendBeaconOperaMini();`;

  return sendBeaconOperaMiniString;
}
