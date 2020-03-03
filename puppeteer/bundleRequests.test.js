// eslint-disable-next-line import/no-unresolved
import puppeteer from 'puppeteer';
import { localBaseUrl } from '#testHelpers/config';
import shouldSmokeTest from '../cypress/support/helpers/shouldSmokeTest';
import serviceHasPageType from '../cypress/support/helpers/serviceHasPageType';
import getPaths from '../cypress/support/helpers/getPaths';

global.Cypress = { env: () => 'local' };

const config = require('../cypress/support/config/services');

let browser;
let page;
let requests = [];

const isJsBundle = url => url.includes(localBaseUrl);

jest.setTimeout(10000); // overriding the default jest timeout

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
        pageType =>
          shouldSmokeTest(pageType, service) &&
          serviceHasPageType(service, pageType),
      )
      .forEach(pageType => {
        const paths = getPaths(service, pageType);

        if (paths.length > 0) {
          const path = paths[0];

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
                      `(\\/static\\/js\\/(main|vendor|${config[service].name})-\\w+\\.\\w+\\.js)`,
                      'g',
                    ),
                  );
                });
            });

            it('loads at least 1 service bundle', () => {
              const serviceMatches = requests.filter(url =>
                url.match(
                  new RegExp(
                    `(\\/static\\/js\\/${config[service].name}-\\w+\\.\\w+\\.js)`,
                    'g',
                  ),
                ),
              );

              expect(serviceMatches.length).toBeGreaterThanOrEqual(1);
            });
          });
        } else {
          describe(`No bundle request tests for ${service} ${pageType}`, () => {});
        }
      });
  });
});
