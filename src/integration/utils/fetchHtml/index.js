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

    console.log("i'm running for", url);
    console.log('headers', headers);

    operation.attempt(async currentAttempt => {
      // // Optional delay before first attempt
      // if (currentAttempt === 1) {
      //   // eslint-disable-next-line no-promise-executor-return
      //   await new Promise(res => setTimeout(res, 1000)); // wait 1s
      // }
      console.log("I'm trying - attempt number", currentAttempt);

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

        console.log('I have the HTML I need');

        // console.log(`Final HTML for ${url}:\n`, html); // show first 500 char

        const window = new Window({ url });
        const document = new window.DOMParser().parseFromString(
          html
            .replaceAll('&#x27;', "'")
            .replaceAll('&lt;', '<')
            .replaceAll('&gt;', '>'),
          'text/html',
        );

        resolve({ window, document });

        // // Check for required elements in the parsed DOM
        // const hasMain = !!document.querySelector('main');
        // const hasTime = !!document.querySelector('time');

        // if (!hasMain || !hasTime) {
        //   const error = new Error(
        //     `Parsed document missing expected elements for ${url}:` +
        //       `${!hasMain ? ' <main>' : ''}${!hasTime ? ' <time>' : ''}`,
        //   );
        //   if (operation.retry(error)) {
        //     return;
        //   }
        //   reject(operation.mainError());
        //   return;
        // }

        // resolve({ window, document });
      } catch (error) {
        console.log('Oops There is an error', error.toString());
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
