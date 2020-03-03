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

const richTextTransformsBundleRegex = /rich-text-transforms.*\.js/;

jest.setTimeout(10000); // overriding the default jest timeout

describe('rich-text-transforms JS bundle request', () => {
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
          pageType === 'mediaAssetPage' &&
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

            it('does not load the rich-text-transforms bundle on initial page load', async () => {
              expect(
                requests.some(url => url.match(richTextTransformsBundleRegex)),
              ).toEqual(false);
            });

            // This scenario will not currently apply as we do not do client-side navigation on MAP pages
            // Once client side nav is enabled, we should consider adding a test to ensure that the
            // rich-text-transforms bundle is loaded in to deal with the data transformations
            it.skip('only loads rich-text-transforms bundle after client navigation to MAP asset', async () => {
              await page.evaluate(() => {
                document.querySelector(
                  'a[data-e2e="cpsAssetDummyLink"]',
                ).style.display = 'inline';
              });

              await Promise.all([
                page.click('a[data-e2e="cpsAssetDummyLink"]'),
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
              ]);

              await page.waitForRequest(request =>
                request.url().match(richTextTransformsBundleRegex),
              );

              expect(
                requests.some(url => url.match(richTextTransformsBundleRegex)),
              ).toEqual(true);
            });
          });
        } else {
          describe(`No rich-text-transforms tests for ${service} ${pageType}`, () => {});
        }
      });
  });
});
