const logResults = require('./logResults');

const config = require(`../../lighthouse`);
const launchLighthouse = require('./runLighthouse');

launchLighthouse(config)
  .then(logResults.logHighLevelScores)
  .then(logResults.checkFailures);
