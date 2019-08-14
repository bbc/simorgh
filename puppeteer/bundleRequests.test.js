import puppeteer from 'puppeteer';
import { localBaseUrl } from '../src/testHelpers/config';

global.Cypress = { env: () => 'local' };

const config = require('../cypress/support/config/services');

let browser;
let page;
let requests = [];

const isJsBundle = url => url.includes(localBaseUrl);

describe('Js bundle requests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    page = await browser.newPage();

    page.on('request', request => {
      requests.push(request.url());
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  Object.keys(config).forEach(service => {
    Object.keys(config[service].pageTypes)
      .filter(
        pageType => config[service].pageTypes[pageType].path !== undefined,
      )
      .forEach(pageType => {
        const { path } = config[service].pageTypes[pageType];

        describe(service, () => {
          beforeAll(async () => {
            await page.goto(`${localBaseUrl}${path}`, {
              waitUntil: 'networkidle2',
            });
          });

          afterAll(() => {
            requests = [];
          });

          it('only loads expected js bundles', () => {
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

          it('loads at least 1 service bundle', () => {
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
