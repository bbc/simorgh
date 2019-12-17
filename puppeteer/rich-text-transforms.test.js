// eslint-disable-next-line import/no-unresolved
import puppeteer from 'puppeteer';
import { localBaseUrl } from '#testHelpers/config';
import shouldSmokeTest from '../cypress/support/helpers/shouldSmokeTest';

global.Cypress = { env: () => 'local' };

const config = require('../cypress/support/config/services');

let browser;
let page;
let requests = [];

const richTextTransformsBundleRegex = new RegExp(
  `(\\/static\\/js\\/rich-text-transforms-\\w+\\.\\w+\\.js)`,
  'g',
);

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
          config[service].pageTypes[pageType].path !== undefined,
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

          it('only loads rich-text-transforms bundle after client navigation to MAP asset', async () => {
            expect(
              requests.some(url => url.match(richTextTransformsBundleRegex)),
            ).toEqual(false);

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
      });
  });
});
