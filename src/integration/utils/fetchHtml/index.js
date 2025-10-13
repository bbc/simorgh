/* eslint-disable no-console */
import { Window } from 'happy-dom';
import { operation } from 'retry';
import { setDefaultResultOrder } from 'node:dns';

// https://github.com/node-fetch/node-fetch/issues/1624#issuecomment-1407717012
setDefaultResultOrder('ipv4first');

export default ({ url, headers }) =>
  new Promise((resolve, reject) => {
    const oneSecond = 1000;
    const retry = operation({
      retries: 5,
      factor: 1,
      minTimeout: oneSecond,
      maxTimeout: oneSecond,
    });

    retry.attempt(async currentAttempt => {
      if (currentAttempt > 1) {
        console.warn(
          `Error getting HTML from ${url}`,
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
