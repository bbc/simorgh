const jsdom = require('jsdom');
const dotenv = require('dotenv');

class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    if (url === dotenv.config().parsed.SIMORGH_REVERB_SOURCE) {
      return super.fetch(url, options);
    }

    return null;
  }
}

module.exports = CustomResourceLoader;
