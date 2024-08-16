const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    if (!Boolean(window.hasOperaMinScriptRun)) {
      window.hasOperaMinScriptRun = true;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "${atiPageViewUrlString}", true);
      xhr.withCredentials = true;
      xhr.send();
    }
`;

export default sendBeaconOperaMiniScript;
