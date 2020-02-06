/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const cmd = require('node-cmd');
const beautify = require('json-beautify');
const fse = require('fs-extra');

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
    return new Promise((resolve, reject) => {
      const curlCmd = `curl ${this.aresUrl} -E ${CERTS.DEV} --cacert ${CERTS.CA}`;
      cmd.get(curlCmd, (curlError, data) => {
        if (curlError) {
          console.error(
            `HTTPS Error - did you set the correct dev cert and CA within ./config.js?`,
          );
          return reject(curlError);
        }
        const prettifiedData = beautify(JSON.parse(data), null, 2, 100);
        fse.outputFile(this.outputPath, prettifiedData, () => {
          return resolve(data);
        });
      });
    });
  }
}

module.exports = PageFixture;
