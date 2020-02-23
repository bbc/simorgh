const { Helper } = codeceptjs;

class Nightmare extends Helper {
  async seeTagHasValue(locator, attribute, expectedValue) {
    const assert = require('chai').assert;
    const browser = this.helpers['Nightmare'].browser;
    const elements = await this.helpers['Nightmare']._locate(locator);

    const attrValue = await browser.evaluate(
      (el, attribute) => {
        return codeceptjs.fetchElement(el).getAttribute(attribute);
      },
      elements[0],
      attribute,
    );

    assert.include(attrValue, expectedValue);
  }

  async seeTagExists(locator) {
    const assert = require('chai').assert;
    const browser = this.helpers['Nightmare'].browser;
    const elements = await this.helpers['Nightmare']._locate(locator);

    const attrValue = await browser.evaluate(el => {
      if (!el) {
        return null;
      }

      return codeceptjs.fetchElement(el);
    }, elements[0]);

    assert.exists(attrValue, `${locator} not found`);
  }
}

module.exports = Nightmare;
