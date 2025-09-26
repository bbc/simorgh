/* eslint-disable no-console */

const TestEnvironment = require('@happy-dom/jest-environment').default;
const fetchHtml = require('./utils/fetchHtml');
const getPageTypeFromTestPath = require('./utils/getPageTypeFromTestPath');
const camelCaseToText = require('./utils/camelCaseToText');

class IntegrationTestEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
    const { platform } = config.projectConfig.testEnvironmentOptions;
    const {
      pathname,
      service,
      displayAds = 'false',
      isInUK = 'no',
    } = context.docblockPragmas;
    const pageType = getPageTypeFromTestPath(context.testPath);

    const platformForPath = ['amp', 'lite'].includes(platform)
      ? `.${platform}`
      : '';

    this.pageType = camelCaseToText(pageType);
    this.service = service;
    this.displayAds = displayAds === 'true';
    this.isInUK = isInUK;
    this.url = `http://localhost:7080${pathname}${platformForPath}`;
  }

  async setup() {
    await super.setup();

    const { window, document } = await fetchHtml({
      url: this.url,
      headers: {
        ...(this.displayAds && { 'BBC-Adverts': 'true' }),
        ...{ 'x-bbc-edge-isuk': this.isInUK },
      },
    });

    Object.defineProperties(this.global, {
      pageType: { value: this.pageType },
      service: { value: this.service },
      window: { value: window },
      document: { value: document },
      fetch: { value: fetch },
    });
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = IntegrationTestEnvironment;
