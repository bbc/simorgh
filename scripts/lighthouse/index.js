const logResults = require('./logResults');

const config = require(`../../lighthouse`);
const launchLighthouse = require('./runLighthouse');

module.exports.indexRunner = () =>
  launchLighthouse(config)
    .then(logResults.logHighLevelScores)
    .then(logResults.checkFailures);
