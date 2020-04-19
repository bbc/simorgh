const JsdomEnvironment = require('jest-environment-jsdom');
const fetchDom = require('./fetchDom');

const camelCaseToText = (camelCase) => {
  const text = camelCase.replace(/([A-Z])/g, ' $1');

  return text.charAt(0).toUpperCase() + text.slice(1);
};

const getPageType = (testPath) => {
  const [pageType] = testPath.match(/(?<=\/integration\/pages\/).+?(?=\/)/);

  return pageType;
};

class IntegrationTestEnvironment extends JsdomEnvironment {
  constructor(config, context) {
    super(config, context);
    const { platform } = config.testEnvironmentOptions;
    const { pathname, service } = context.docblockPragmas;
    const pageType = getPageType(context.testPath);

    this.pageType = camelCaseToText(pageType);
    this.platform = platform;
    this.service = service;
    this.url = `http://localhost:7080${pathname}${
      platform === 'amp' ? '.amp' : ''
    }`;
  }

  async setup() {
    await super.setup();

    try {
      const dom = await fetchDom(this.url);

      Object.defineProperties(this.global, {
        pageType: { value: this.pageType },
        service: { value: this.service },
        window: { value: dom.window },
        document: { value: dom.window.document },
        platform: { value: this.platform },
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

module.exports = IntegrationTestEnvironment;
