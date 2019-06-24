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
        requests
          .filter(url => url.endsWith('.js'))
          .forEach(url => {
            expect(url).toMatch(
              new RegExp(
                `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
                'g',
              ),
            );
          });
      });

      it('loads at least 1 service bundle', async () => {
        const serviceMatches = requests.filter(url =>
          url.match(
            new RegExp(`(\\/static\\/js\\/${service}-\\w+\\.\\w+\\.js)`, 'g'),
          ),
        );

        expect(serviceMatches.length).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
