import { JSDOM } from 'jsdom';
import pipe from 'ramda/src/pipe';

const { canonical, amp } = global;

// replace things in the HTML that change every render such as random IDs and timeOnServer
const replaceTimeOnServer = html =>
  html.replace(/"timeOnServer":\d+/gm, '"timeOnServer": "mock-time"');

const replaceIds = html => html.replace(/"id":".+?"/gm, '"id":"mock-id"');

const replaceUUIDs = html =>
  html.replace(/"uuid":".+?"/gm, '"uuid":"mock-uuid"');

const removeElements = elements => {
  Array.from(elements).forEach(element => element.remove());
};

const replaceStaticScriptSrc = html =>
  html.replace(/static\/js\/.+?\.js/gm, replacement => {
    return `${replacement.split('.')[0]}.js`;
  });

const getFixedHtml = pipe(
  replaceTimeOnServer,
  replaceIds,
  replaceUUIDs,
  replaceStaticScriptSrc,
);

const getHtmlString = doc => doc.querySelector('html').outerHTML;

export default () => {
  [canonical, amp].forEach(page => {
    describe(`And using ${page.platform}`, () => {
      const htmlString = getHtmlString(page.document);
      const fixedHtml = getFixedHtml(htmlString);
      const doc = new JSDOM(fixedHtml).window.document; // clone so we don't mutate the dom shared across tests

      it('I can see the server-rendered HTML', () => {
        removeElements(
          doc.querySelectorAll('[data-styled], style[amp-custom]'),
        ); // styles change between each build for some reason

        const html = getHtmlString(doc);

        expect(html).toMatchSnapshot();
      });
    });
  });
};
