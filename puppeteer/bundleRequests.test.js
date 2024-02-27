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

const TIMEOUT = 60000;

jest.setTimeout(TIMEOUT); // overriding the default jest timeout

const getServiceBundleRegex = service => {
  const SHARED_RUSSIAN_UKRAINIAN = 'shared-russian-ukrainian';

  switch (service) {
    case 'russian':
      return SHARED_RUSSIAN_UKRAINIAN;
    case 'ukrainian':
      return `${service}|${SHARED_RUSSIAN_UKRAINIAN}`;
    default:
      return service;
  }
};

describe('Js bundle requests', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    page = await browser.newPage();

    page.setDefaultNavigationTimeout(TIMEOUT);

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
              const serviceRegex = getServiceBundleRegex(config[service].name);

              requests
                .filter(url => url.endsWith('.js'))
                .filter(isJsBundle)
                .forEach(url => {
                  expect(url).toMatch(
                    new RegExp(
                      `(\\/static\\/js\\/(?:comscore\\/)?(modern.)?(main|framework|commons|shared|${serviceRegex}|frosted_promo|themes|.+Page).+?.js)|(\\/static\\/.+?-lib.+?.js)|${config[service].name}\\/(articles\\/)?sw\\.js`,
                      'g',
                    ),
                  );
                });
            });

            it('loads at least 1 modern service bundle', () => {
              const serviceRegex = getServiceBundleRegex(config[service].name);
              const serviceMatches = requests.filter(url =>
                url.match(
                  new RegExp(
                    `(\\/static\\/js\\/modern.${serviceRegex}.+?.js)`,
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
