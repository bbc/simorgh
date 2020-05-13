/* eslint-disable no-console */

const { JSDOM } = require('jsdom');
const retry = require('retry');

const faultTolerantDomFetch = url =>
  new Promise((resolve, reject) => {
    const oneSecond = 1000;
    const operation = retry.operation({
      retries: 5,
      factor: 1,
      minTimeout: oneSecond,
      maxTimeout: oneSecond,
    });

    operation.attempt(async currentAttempt => {
      if (currentAttempt > 1) {
        console.warn(
          `Error getting DOM from ${url}`,
          `Retry attempts: ${currentAttempt - 1}`,
        );
      }

      try {
        const dom = await JSDOM.fromURL(url);

        resolve(dom);
      } catch (error) {
        const isSocketHangUpError = error
          .toString()
          .includes('Error: socket hang up');

        if (isSocketHangUpError) {
          if (operation.retry(error)) {
            return;
          }
        }

        reject(error);
      }
    });
  });

module.exports = faultTolerantDomFetch;
