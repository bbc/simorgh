export const addSendStaticBeaconToWindow = () => `
    window.sendStaticBeacon = function (atiUrlString) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", atiUrlString, true);
        xhr.withCredentials = true;
        xhr.send();
    };
`;

export default (atiUrlString: string) => `
    window.sendStaticBeacon("${atiUrlString}");
`;
