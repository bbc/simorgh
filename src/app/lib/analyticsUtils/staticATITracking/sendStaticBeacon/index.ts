export const addSendStaticBeaconToWindow = () => {
  window.sendStaticBeacon = function (atiUrlString) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', atiUrlString, true);
    xhr.withCredentials = true;
    xhr.send();
    return true;
  };
};

export default (atiUrlString: string) =>
  window.sendStaticBeacon(`${atiUrlString}`);
