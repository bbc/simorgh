/* eslint-disable import/no-relative-packages */
/* eslint-disable no-console */
const TestEnvironment = require('@happy-dom/jest-environment').default;
import type {
  JestEnvironmentConfig,
  EnvironmentContext,
} from '@jest/environment';
import getPageTypeFromTestPath from '../../src/integration/utils/getPageTypeFromTestPath';
import camelCaseToText from '../../src/integration/utils/camelCaseToText';
import fetchDom from '../../src/integration/utils/fetchDom';

class CustomTestEnvironment extends TestEnvironment {
  pageType: string;

  service: string | string[];

  runScripts: boolean;

  displayAds: boolean;

  url: string;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
    const { platform } = config.projectConfig.testEnvironmentOptions;
    const {
      pathname,
      service,
      runScripts = 'true',
      displayAds = 'false',
    } = context.docblockPragmas;

    const pageType = getPageTypeFromTestPath(context.testPath);

    this.pageType = camelCaseToText(pageType);
    this.service = service;
    this.runScripts = runScripts === 'true';
    this.displayAds = displayAds === 'true';
    this.url = `http://localhost:7081${pathname}${
      platform === 'amp' ? '.amp' : ''
    }`;
  }

  async setup() {
    await super.setup();

    try {
      const { window, document } = await fetchDom({
        url: this.url,
        runScripts: this.runScripts,
        headers: {
          ...(this.displayAds && { 'BBC-Adverts': 'true' }),
        },
      });

      Object.defineProperties(this.global, {
        pageType: { value: this.pageType },
        service: { value: this.service },
        window: { value: window },
        document: { value: document },
        fetch: { value: fetch },
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
