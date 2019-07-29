import puppeteer from 'puppeteer';

global.Cypress = { env: () => 'local' };

const config = require('../cypress/support/config/services').default;

let browser;
let page;
let requests = [];

const host = 'http://localhost:7080';

const isJsBundle = url => url.includes(host);

describe('Js bundle requests', () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    page = await browser.newPage();

    page.on('request', request => {
      requests.push(request.url());
    });
  });

  afterEach(async () => {
    browser.close();
    requests = [];
  });

  Object.keys(config).forEach(service => {
    Object.keys(config[service].pageTypes)
      .filter(pageType => config[service].pageTypes[pageType] !== undefined)
      .forEach(pageType => {
        let path;

        switch (pageType) {
          case 'frontPage':
            path = config[service].pageTypes.frontPage;
            break;
          case 'articles':
            path = `/${service}/articles/${config[service].pageTypes.articles.asset}`;
            break;
          default:
            return;
        }

        describe(service, () => {
          beforeEach(async () => {
            await page.goto(`${host}${path}`, {
              waitUntil: 'networkidle2',
            });
          });

          it('only loads expected js bundles', async () => {
            requests
              .filter(url => url.endsWith('.js'))
              .filter(isJsBundle)
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
                new RegExp(
                  `(\\/static\\/js\\/${service}-\\w+\\.\\w+\\.js)`,
                  'g',
                ),
              ),
            );

            expect(serviceMatches.length).toBeGreaterThanOrEqual(1);
          });
        });
      });
  });
});
