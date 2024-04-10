/* eslint-disable no-console */

import { TestEnvironment as JsdomEnvironment } from 'jest-environment-jsdom';
import fetchDom from './utils/fetchDom.js';
import getPageTypeFromTestPath from './utils/getPageTypeFromTestPath.js';
import camelCaseToText from './utils/camelCaseToText.js';

class IntegrationTestEnvironment extends JsdomEnvironment {
  constructor(config, context) {
    super(config, context);
    const { platform } = config.projectConfig.testEnvironmentOptions;
    const {
      pathname,
      service,
      runScripts = 'true',
      displayAds = 'false',
      isInUK = 'no',
    } = context.docblockPragmas;
    const pageType = getPageTypeFromTestPath(context.testPath);

    this.pageType = camelCaseToText(pageType);
    this.service = service;
    this.runScripts = runScripts === 'true';
    this.displayAds = displayAds === 'true';
    this.isInUK = isInUK;
    this.url = `http://localhost:7080${pathname}${
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
          ...{ 'x-bbc-edge-isuk': this.isInUK },
        },
      });

      Object.defineProperties(this.global, {
        pageType: { value: this.pageType },
        service: { value: this.service },
        window: { value: dom.window },
        document: { value: dom.window.document },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

export default IntegrationTestEnvironment;
