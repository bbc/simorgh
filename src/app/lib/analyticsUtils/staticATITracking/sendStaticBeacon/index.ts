export const addSendStaticBeaconToWindow = () => {
  window.sendStaticBeacon = atiUrlString => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', atiUrlString, true);
    xhr.withCredentials = true;
    xhr.send();
  };
};

export default (atiUrlString: string) => {
  window.sendStaticBeacon(atiUrlString);
};
