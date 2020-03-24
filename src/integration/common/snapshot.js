import pipe from 'ramda/src/pipe';

const { amp, canonical } = global;

// replace things in the HTML that change every render such as random IDs and timeOnServer
const replaceTimeOnServer = html =>
  html.replace(/"timeOnServer":\d+/gm, '"timeOnServer": "mock-time"');

const replaceIds = html => html.replace(/"id":".+?"/gm, '"id":"mock-id"');

const replaceUUIDs = html =>
  html.replace(/"uuid":".+?"/gm, '"uuid":"mock-uuid"');

const getFixedHtml = pipe(replaceTimeOnServer, replaceIds, replaceUUIDs);

export default () => {
  [amp, canonical].forEach(page => {
    describe(`For the ${page.platform} platform`, () => {
      it('I can see the server-rendered HTML', () => {
        const html = page.document.querySelector('html').outerHTML;
        const fixedHtml = getFixedHtml(html);

        expect(fixedHtml).toMatchSnapshot();
      });
    });
  });
};
