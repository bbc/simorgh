/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const cmd = require('node-cmd');
const beautify = require('json-beautify');
const fs = require('fs');

const { ENVIRONMENTS, ARES_URLS, CERTS } = require('./config');

class PageFixture {
  constructor(id) {
    const parts = id.split('/');
    this.service = parts.shift();
    this.id = parts.join('/');

    // TODO: make dynamic
    this.environment = ENVIRONMENTS.LIVE;
  }

  // Where to get the data
  get aresUrl() {
    return `${ARES_URLS[this.environment]}/${this.service}/${this.id}`;
  }

  // Where to store the data
  get outputPath() {
    return `test-directory/${this.id}.json`;
  }

  // TODO: reporting, error handling
  downloadFixture() {
    return new Promise(resolve => {
      const curlCmd = `curl ${this.aresUrl} -E ${CERTS.DEV} --cacert ${CERTS.CA}`;
      cmd.get(curlCmd, (curlError, data) => {
        const prettifiedData = beautify(JSON.parse(data), null, 2, 100);
        fs.writeFile(this.outputPath, prettifiedData, () => {
          resolve(data);
        });
      });
    });
  }
}

module.exports = PageFixture;
