export const addSendStaticBeaconToWindow = () => `
    function sendStaticBeacon (atiUrlString) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", atiUrlString, true);
        xhr.withCredentials = true;
        xhr.send();
    }
    
    window.sendStaticBeacon = sendStaticBeacon;
`;

export const sendStaticBeacon = (atiUrlString: string) => `
    window.sendStaticBeacon("${atiUrlString}")
`;
