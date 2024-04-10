/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';

// https://github.com/node-fetch/node-fetch/issues/1624#issuecomment-1407717012
import dns from 'node:dns';

import { JSDOM } from 'jsdom';
import retry from 'retry';

dns.setDefaultResultOrder('ipv4first');

export default ({ url, runScripts, headers }) =>
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
