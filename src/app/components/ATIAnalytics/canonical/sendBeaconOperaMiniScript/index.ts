import isOperaProxy from '#app/lib/utilities/isOperaProxy';

const sendBeaconOperaMiniScript = (atiPageViewUrlString: string) => {
  // @ts-expect-error setting hasOperaMiniScriptRan on the window object is required to prevent duplicate events firing
  if (isOperaProxy() && !window.hasOperaMiniScriptRan) {
    // @ts-expect-error setting hasOperaMiniScriptRan on the window object is required to prevent duplicate events firing
    window.hasOperaMiniScriptRan = true;

    let atiPageViewUrl = atiPageViewUrlString;
    atiPageViewUrl += document.referrer ? `&ref=${document.referrer}` : '';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', atiPageViewUrl, true);
    xhr.withCredentials = true;
    xhr.send();
  }
};

export default sendBeaconOperaMiniScript;
