export const LOADER_ATTRIBUTE = 'data-lite-media-loader';
export const LOADER_BUTTON_ATTRIBUTE = 'data-lite-media-loader-button';

/*
 * One delegated click handler shared by every LiteMediaLoader on the page.
 * Written as an ES5 string (not a serialised function) so build tooling can't
 * change it, and so it runs on the older browsers the Lite site targets.
 * It is attached to `document` straight away, so buttons work before the
 * page's `load` event has fired.
 */
const loaderScript = `(function () {
  if (window.__liteMediaLoader) return;
  window.__liteMediaLoader = true;

  document.addEventListener('click', function (event) {
    var button = event.target;

    while (button && button !== document) {
      if (button.hasAttribute && button.hasAttribute('${LOADER_BUTTON_ATTRIBUTE}')) break;
      button = button.parentNode;
    }

    if (!button || button === document) return;

    var wrapper = button.parentNode;
    var template = wrapper && wrapper.querySelector('template');

    if (!template || !template.content || !wrapper.parentNode) return;

    wrapper.parentNode.replaceChild(template.content.cloneNode(true), wrapper);
  });
})();`;

export default loaderScript;
