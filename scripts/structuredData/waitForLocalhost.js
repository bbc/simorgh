/* eslint-disable no-console */
const retry = require('retry');
const fetch = require('node-fetch');

const waitForLocalhost = () =>
  new Promise((resolve, reject) => {
    const oneSecond = 1000;
    const operation = retry.operation({
      retries: 5,
      factor: 1,
      minTimeout: oneSecond,
      maxTimeout: oneSecond,
    });
    const url = 'http://localhost:7080/status';

    operation.attempt(async currentAttempt => {
      if (currentAttempt > 1) {
        console.warn(
          `Error getting DOM from ${url}`,
          `Retry attempts: ${currentAttempt - 1}`,
        );
      }

      try {
        await fetch(url);
        resolve();
      } catch (error) {
        const errString = error.toString();
        const isConnectionError =
          errString.includes('ECONNREFUSED') ||
          errString.includes('ECONNRESET');

        if (isConnectionError) {
          if (operation.retry(error)) {
            return;
          }
        }

        reject(error);
      }
    });
  });

module.exports = waitForLocalhost;
