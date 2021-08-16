import 'isomorphic-fetch';
import path from 'ramda/src/path';

import getCookieOvenEndpoints from './getCookieOvenEndpoints';

export default async (policy, logger) => {
  const origin = path(['location', 'origin'], window);

  if (origin) {
    const cookieOvenEndpoints = getCookieOvenEndpoints({
      origin,
      policy,
    });

    try {
      await Promise.all(cookieOvenEndpoints.map(endpoint => fetch(endpoint)));
    } catch (e) {
      const log = logger || console;

      log.error(e);
    }
  }
};
