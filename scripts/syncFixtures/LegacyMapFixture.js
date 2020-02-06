const PageFixture = require('./PageFixture');

class LegacyMapFixture extends PageFixture {
  get outputPath() {
    return `../../data/${this.service}/cpsAssets/legacyMAP/${this.outputFileName}`;
  }

  get outputFileName() {
    return `${this.id.replace(/\//g, '-')}.json`;
  }
}

module.exports = LegacyMapFixture;
