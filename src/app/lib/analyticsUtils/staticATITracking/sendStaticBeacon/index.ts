export const addSendStaticBeaconToWindow = () => `
    console.log("SEND STATIC SCRIPT ADDED")
    window.sendStaticBeacon = function (atiUrlString) {
        console.log("ATTEMPTING SEND...", atiUrlString)
        var xhr = new XMLHttpRequest();
        xhr.open("GET", atiUrlString, true);
        xhr.withCredentials = true;
        xhr.send();
    };
`;

export default (atiUrlString: string) => `
    window.sendStaticBeacon("${atiUrlString}");
`;
