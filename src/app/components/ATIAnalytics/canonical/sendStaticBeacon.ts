const sendStaticBeacon = (atiPageViewUrlString: string) => `
    function sendStaticBeacon (atiPageViewUrlString) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", atiPageViewUrlString, true);
        xhr.withCredentials = true;
        xhr.send();
    }
    
    sendStaticBeacon("${atiPageViewUrlString}");
`;

export default sendStaticBeacon;
