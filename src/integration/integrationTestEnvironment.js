const JsdomEnvironment = require('jest-environment-jsdom');
const { JSDOM } = require('jsdom');

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

    try {
      const dom = await JSDOM.fromURL(this.url);

      Object.defineProperties(this.global, {
        service: { value: this.service },
        window: { value: dom.window },
        document: { value: dom.window.document },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = IntegrationTestEnvironment;
