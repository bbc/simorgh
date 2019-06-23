import puppeteer from 'puppeteer';
import scriptMatches from '../cypress/support/scriptMatches';

let browser;
let page;
let requests = [];

const config = [
  { service: 'news', path: '/news/articles/c0g992jmmkko' },
  { service: 'persian', path: '/persian/articles/c4vlle3q337o' },
  { service: 'igbo', path: '/igbo' },
  { service: 'yoruba', path: '/yoruba' },
  { service: 'pidgin', path: '/pidgin' },
];

describe('Js bundle requests', () => {
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    page.on('request', request => {
      requests.push(request.url());
    });
  });

  afterEach(async () => {
    browser.close();
    requests = [];
  });

  config.forEach(({ service, path }) => {
    describe(service, () => {
      beforeEach(async () => {
        await page.goto(`http://localhost:7080${path}`, {
          waitUntil: 'networkidle2',
        });
      });

      it('only loads expected js bundles', async () => {
        const requestedJs = requests.filter(url => url.endsWith('.js'));

        const unwantedRequests = requestedJs.filter(url => {
          const matches = scriptMatches(service).filter(regex =>
            url.match(regex),
          );

          return matches.length === 0;
        });

        expect(unwantedRequests).toHaveLength(0);
      });
    });
  });
});
