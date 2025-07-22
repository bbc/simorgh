import isOperaProxy from '#app/lib/utilities/isOperaProxy';

export default (atiPageViewUrlString: string) => `
    if (${isOperaProxy.toString()}() && !Boolean(window.hasOperaMiniScriptRan)) {
      window.hasOperaMiniScriptRan = true;

      var trackingPixelURL = "${atiPageViewUrlString}";

      var trackingPixel = new Image;
      trackingPixel.src = trackingPixelURL;
      var _window;
      console.log((_window = window) === null || _window === void 0 ? void 0 : _window.ATInternet);
    }
`;
