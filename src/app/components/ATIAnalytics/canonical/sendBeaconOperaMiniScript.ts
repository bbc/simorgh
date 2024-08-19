const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    if (!Boolean(window.hasOperaMinScriptRan)) {
      window.hasOperaMinScriptRan = true;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "${atiPageViewUrlString}", true);
      xhr.withCredentials = true;
      xhr.send();
    }
`;

export default sendBeaconOperaMiniScript;
