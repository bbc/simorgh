/* eslint-disable import/no-relative-packages */
/* eslint-disable no-console */
import { TestEnvironment } from 'jest-environment-jsdom';
import type {
  JestEnvironmentConfig,
  EnvironmentContext,
} from '@jest/environment';
import getPageTypeFromTestPath from '../../src/integration/utils/getPageTypeFromTestPath';
import camelCaseToText from '../../src/integration/utils/camelCaseToText';
import fetchDom from '../../src/integration/utils/fetchDom';

class CustomTestEnvirnoment extends TestEnvironment {
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
      const dom = await fetchDom({
        url: this.url,
        runScripts: this.runScripts,
        headers: {
          ...(this.displayAds && { 'BBC-Adverts': 'true' }),
        },
      });

      Object.defineProperties(this.global, {
        pageType: { value: this.pageType },
        service: { value: this.service },
        window: { value: dom.window },
        document: { value: dom.window.document },
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

export default CustomTestEnvirnoment;
