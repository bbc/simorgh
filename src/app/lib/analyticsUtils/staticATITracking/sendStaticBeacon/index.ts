// eslint-disable-next-line func-names
export const addSendStaticBeaconToWindow = function () {
  // eslint-disable-next-line func-names
  window.sendStaticBeacon = function (atiUrlString) {
    // eslint-disable-next-line no-var
    var xhr = new XMLHttpRequest();
    xhr.open('GET', atiUrlString, true);
    xhr.withCredentials = true;
    xhr.send();
  };
};

export default (atiUrlString: string) => {
  window.sendStaticBeacon(atiUrlString);
};
