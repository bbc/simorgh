import puppeteer from 'puppeteer';
import path from 'ramda/src/path';

global.Cypress = { env: () => 'local' };

const config = require('../cypress/support/config/services').default;

let browser;
let page;
let requests = [];

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
      .filter(pageType =>
        path(['pageTypes', pageType, 'asset'], config[service]),
      )
      .forEach(pageType => {
        const assetPath =
          pageType === 'frontPage'
            ? `/${service}`
            : `/${service}/articles/${config[service].pageTypes.articles.asset}`;

        describe(service, () => {
          beforeEach(async () => {
            await page.goto(`http://localhost:7080${assetPath}`, {
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
