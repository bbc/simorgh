import puppeteer from 'puppeteer';
import cypressConfig from '../cypress/support/config';

let browser;
let page;
let requests = [];

const config = cypressConfig('local');

const services = [
  { service: 'news', path: `/news/articles/${config.assets.news}` },
  { service: 'persian', path: `/persian/articles/${config.assets.persian}` },
  { service: 'igbo', path: '/igbo' },
  { service: 'yoruba', path: '/yoruba' },
  { service: 'pidgin', path: '/pidgin' },
];

const bundleRegex = name =>
  new RegExp(`(\\/static\\/js\\/${name}-\\w+\\.\\w+\\.js)`, 'g');

const getMatchCount = (regex, arr) => arr.filter(i => i.match(regex)).length;

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

  services.forEach(({ service, path }) => {
    describe(service, () => {
      beforeEach(async () => {
        await page.goto(`http://localhost:7080${path}`, {
          waitUntil: 'networkidle2',
        });
      });

      it('only loads expected js bundles', async () => {
        const loadedScriptUrls = requests.filter(url => url.endsWith('.js'));

        const mainMatchCount = getMatchCount(
          bundleRegex('main'),
          loadedScriptUrls,
        );
        const vendorMatchCount = getMatchCount(
          bundleRegex('vendor'),
          loadedScriptUrls,
        );
        const serviceMatchCount = getMatchCount(
          bundleRegex(service),
          loadedScriptUrls,
        );

        expect(mainMatchCount + vendorMatchCount + serviceMatchCount).toEqual(
          loadedScriptUrls.length,
        );

        expect(serviceMatchCount).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
