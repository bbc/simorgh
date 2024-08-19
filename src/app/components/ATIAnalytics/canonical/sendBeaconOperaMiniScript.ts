const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => `
    console.log("TEST CHECK1", runCount)
    var runCount = 0;
    if (runCount <= 1) {
      runCount += 1;
      console.log("TEST CHECK2", runCount)
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "${atiPageViewUrlString}", true);
      xhr.withCredentials = true;
      xhr.send();
    }
    console.log("TEST CHECK3", runCount)
`;

export default sendBeaconOperaMiniScript;
