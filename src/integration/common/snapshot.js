import pipe from 'ramda/src/pipe';

const { canonical, amp } = global;

// replace things in the HTML that change every render such as random IDs and timeOnServer
const replaceTimeOnServer = html =>
  html.replace(/"timeOnServer":\d+/gm, '"timeOnServer": "mock-time"');

const replaceIds = html => html.replace(/"id":".+?"/gm, '"id":"mock-id"');

const replaceUUIDs = html =>
  html.replace(/"uuid":".+?"/gm, '"uuid":"mock-uuid"');

const replaceElements = (elements, replacement) => {
  Array.from(elements).forEach(element => {
    // eslint-disable-next-line no-param-reassign
    element.outerHTML = replacement;
  });
};

const replaceStaticScriptSrc = html =>
  html.replace(/static\/js\/main-.+?.js/gm, replacement => {
    return `${replacement.split('.')[0]}.js`;
  });

const getFixedHtml = pipe(
  replaceTimeOnServer,
  replaceIds,
  replaceUUIDs,
  replaceStaticScriptSrc,
);

export default () => {
  [canonical, amp].forEach(page => {
    describe(`For the ${page.platform} platform`, () => {
      it('I can see the server-rendered HTML', () => {
        replaceElements(
          page.document.querySelectorAll('[data-styled]'),
          '<style inline-style-removed-for-snapshot-purposes></style>',
        ); // styles change between each build for some reason
        replaceElements(
          page.document.querySelectorAll('style[amp-custom]'),
          '<style inline-style-removed-for-snapshot-purposes></style>',
        ); // styles change between each build for some reason

        const html = page.document.querySelector('html').outerHTML;
        const fixedHtml = getFixedHtml(html);

        expect(fixedHtml).toMatchSnapshot();
      });
    });
  });
};
