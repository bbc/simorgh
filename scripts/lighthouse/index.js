const logResults = require('./logResults');
const config = require('../../lighthouse');
const launchLighthouse = require('./runLighthouse');

const launchLighthouseAndLogResults = () =>
  launchLighthouse(config)
    .then(logResults.logHighLevelScores)
    .then(logResults.checkFailures);

launchLighthouseAndLogResults(config);

module.exports = launchLighthouseAndLogResults;
