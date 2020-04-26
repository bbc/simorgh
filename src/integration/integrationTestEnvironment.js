/* eslint-disable no-console */

const JsdomEnvironment = require('jest-environment-jsdom');
const chalk = require('chalk');
const fetchDom = require('./utils/fetchDom');

class IntegrationTestEnvironment extends JsdomEnvironment {
  constructor(config, context) {
    super(config, context);
    const { platform } = config.testEnvironmentOptions;
    const { pathname, service } = context.docblockPragmas;

    this.service = service;
    this.url = `http://localhost:7080${pathname}${
      platform === 'amp' ? '.amp' : ''
    }`;
  }

  async setup() {
    await super.setup();
    let dom = {
      window: {
        document: {},
      },
    };

    try {
      dom = await fetchDom(this.url);
    } catch (error) {
      console.log(
        chalk.red.bold('Error setting up test for', this.url, error.statusCode),
      );
    }

    Object.defineProperties(this.global, {
      service: { value: this.service },
      window: { value: dom.window },
      document: { value: dom.window.document },
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
