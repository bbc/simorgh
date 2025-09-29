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
    const { platform } = config.projectConfig.testEnvironmentOptions;
    const {
      pathname,
      service,
      displayAds = 'false',
      // isInUK = 'no',
    } = context.docblockPragmas;

    const pageType = getPageTypeFromTestPath(context.testPath);

    this.pageType = camelCaseToText(pageType);
    this.service = service;
    this.displayAds = displayAds === 'true';
    // this.isInUK = isInUK;
    this.url = `http://localhost:7081${pathname}${
      platform === 'amp' ? '.amp' : ''
    }`;
  }

  async setup() {
    console.log("I'm trying to set up", this.url);
    await super.setup();

    try {
      console.log("I'm trying to fetch", this.url);
      const { window, document } = await fetchHtml({
        url: this.url,
        headers: {
          ...(this.displayAds && { 'BBC-Adverts': 'true' }),
          // ...{ 'x-bbc-edge-isuk': this.isInUK },
        },
      });

      // test
      if (!document || !window) {
        console.log('no document or no window');
      }

      Object.defineProperties(this.global, {
        pageType: { value: this.pageType },
        service: { value: this.service },
        window: { value: window },
        document: { value: document },
        fetch: { value: fetch },
      });
    } catch (e) {
      console.log('There is an error with', this.url);
      console.error(e);
      // throw e; // ⬅️ This ensures the test fails instead of running with broken state
    }
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }

  // run scripts?
}

export default CustomTestEnvironment;
