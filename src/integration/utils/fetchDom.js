/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */

const { Window } = require('happy-dom');
const retry = require('retry');
const dns = require('node:dns');

// https://github.com/node-fetch/node-fetch/issues/1624#issuecomment-1407717012
dns.setDefaultResultOrder('ipv4first');

const faultTolerantDomFetch = ({ url, headers }) =>
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
        const response = await fetch(url, headers && { headers });

        if (!response.ok) {
          const error = new Error(
            `Error: Received HTTP ${response.status} ${response.statusText} for ${url}`,
          );
          reject(error);
          return;
        }

        const html = await response.text();

        const window = new Window({ url });
        const document = new window.DOMParser().parseFromString(
          html,
          'text/html',
        );

        // const footers = document.querySelectorAll('footer a');

        // // console.log({ forEach: footers.forEach });

        // for (const footer of footers) {
        //   console.log(footer);
        // }

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

module.exports = faultTolerantDomFetch;
