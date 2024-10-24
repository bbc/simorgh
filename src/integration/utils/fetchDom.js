/* eslint-disable no-console */

// https://github.com/node-fetch/node-fetch/issues/1624#issuecomment-1407717012
const dns = require('node:dns');

dns.setDefaultResultOrder('ipv4first');

const { JSDOM } = require('jsdom');
const retry = require('retry');

const faultTolerantDomFetch = ({ url, runScripts, headers }) =>
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
        const html = await response.text();
        const dom = new JSDOM(html, {
          url,
          ...(runScripts ? { runScripts: 'dangerously' } : {}),
        });

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
