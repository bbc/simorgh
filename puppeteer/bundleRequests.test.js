import puppeteer from 'puppeteer';
import cypressConfig from '../cypress/support/config';
import wsConfig from '../cypress/support/worldServices';

let browser;
let page;
let requests = [];

const config = cypressConfig('local');

const services = [];

// This logic is required to combine the service configs until
// this is done in https://github.com/bbc/simorgh/issues/2131
const rawConfig = {
  ...wsConfig,
  news: config.assets.news,
  persian: config.assets.persian,
};

Object.keys(rawConfig).forEach(service => {
  if (typeof rawConfig[service] === 'object') {
    services.push({ service, path: rawConfig[service].url });
  } else {
    services.push({
      service,
      path: `/${service}/articles/${rawConfig[service]}`,
    });
  }
});
// End of logic to be removed.

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
