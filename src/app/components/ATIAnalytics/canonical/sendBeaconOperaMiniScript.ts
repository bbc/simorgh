const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    console.log("TEST CHECK1", window.hasOperaMinScriptRun)
    if (!Boolean(window.hasOperaMinScriptRun)) {
      window.hasOperaMinScriptRun = true;
      console.log("TEST CHECK2")
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "${atiPageViewUrlString}", true);
      xhr.withCredentials = true;
      xhr.send();
    }
    console.log("TEST CHECK3", window.hasOperaMinScriptRun)
`;

export default sendBeaconOperaMiniScript;
