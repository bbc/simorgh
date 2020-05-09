const { run } = require('.');
const waitForLocalhost = require('./waitForLocalhost');

const cli = async () => {
  const showInfo = process.argv.includes('-i');
  const shouldWait = process.argv.includes('-w');

  if (shouldWait) {
    await waitForLocalhost();
  }
  run(showInfo);
};

cli();
