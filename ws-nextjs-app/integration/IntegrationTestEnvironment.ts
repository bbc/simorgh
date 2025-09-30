/* eslint-disable import/no-relative-packages */
/* eslint-disable no-console */
import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from '@jest/environment';
import TestEnvironment from '@happy-dom/jest-environment';
import getPageTypeFromTestPath from '../../src/integration/utils/getPageTypeFromTestPath';
import camelCaseToText from '../../src/integration/utils/camelCaseToText';
import fetchHtml from '../../src/integration/utils/fetchHtml';

class CustomTestEnvironment extends TestEnvironment {
  pageType: string;

  service: string | string[];

  displayAds: boolean;

  url: string;

  // isInUK: string | string[];

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    const { platform } = config.projectConfig.testEnvironmentOptions as {
      platform: string;
    };

    const {
      pathname,
      service,
      displayAds = 'false',
      // isInUK = 'no',
    } = context.docblockPragmas;

    const pageType = getPageTypeFromTestPath(context.testPath);

    const platformForPath = ['amp', 'lite'].includes(platform)
      ? `.${platform}`
      : '';

    this.pageType = camelCaseToText(pageType);
    this.service = service;
    this.displayAds = displayAds === 'true';
    // this.isInUK = isInUK;
    this.url = `http://localhost:7081${pathname}${platformForPath}`;
  }

  async setup() {
    await super.setup();

    try {
      const { window, document } = await fetchHtml({
        url: this.url,
        headers: {
          ...(this.displayAds && { 'BBC-Adverts': 'true' }),
          // ...{ 'x-bbc-edge-isuk': this.isInUK },
        },
      });

      Object.defineProperties(this.global, {
        pageType: { value: this.pageType },
        service: { value: this.service },
        window: { value: window },
        document: { value: document },
        fetch: { value: fetch },
      });

      Object.defineProperty(window, 'INTEGRATION_TEST', {
        value: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

export default CustomTestEnvironment;
