import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default (atiPageViewUrlString: string) => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      window.hasOperaMiniScriptRan = true;

      var trackingPixelURL = "${atiPageViewUrlString}";

      var trackingPixel = new Image;
      trackingPixel.src = trackingPixelURL;
    }
`;
