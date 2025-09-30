/* eslint-disable no-console */
const { Window } = require('happy-dom');
const retry = require('retry');
const dns = require('node:dns');

// https://github.com/node-fetch/node-fetch/issues/1624#issuecomment-1407717012
dns.setDefaultResultOrder('ipv4first');

const faultTolerantFetch = ({ url, headers }) =>
  new Promise((resolve, reject) => {
    // const oneSecond = 1000;
    const fiveSeconds = 5000;
    const operation = retry.operation({
      retries: 5,
      factor: 1,
      minTimeout: fiveSeconds,
      maxTimeout: fiveSeconds,
    });

    operation.attempt(async currentAttempt => {
      if (currentAttempt > 1) {
        console.warn(
          `Error getting HTML from ${url}`,
          `Retry attempts: ${currentAttempt - 1}`,
        );
      }

      try {
        const response = await fetch(url, headers && { headers });

        console.log(
          `Received HTTP ${response.status} ${response.statusText} for ${url}`,
        );

        if (!response.ok) {
          const error = new Error(
            `Error: Received HTTP ${response.status} ${response.statusText} for ${url}`,
          );

          // Retry on server errors (5xx) - handle nextJS timeout
          // not sure this fully works
          if (response.status === 500) {
            if (operation.retry(error)) {
              return;
            }
          }

          reject(error);
          return;
        }

        const html = await response.text();

        const window = new Window({ url });
        const document = new window.DOMParser().parseFromString(
          html
            .replaceAll('&#x27;', "'")
            .replaceAll('&lt;', '<')
            .replaceAll('&gt;', '>'),
          'text/html',
        );

        resolve({ window, document });
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

module.exports = faultTolerantFetch;
