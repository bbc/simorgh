const PageFixture = require('./PageFixture');

class LegacyMapFixture extends PageFixture {
  get outputPath() {
    return `../../data/${this.service}/cpsAssets/${this.outputFileName}`;
  }

  get outputFileName() {
    return `${this.id}.json`;
  }
}

module.exports = LegacyMapFixture;
