const {
  ampIntegrationTestConfig,
  canonicalIntegrationTestConfig,
} = require('./jest.config');

module.exports = {
  projects: [ampIntegrationTestConfig, canonicalIntegrationTestConfig],
};
