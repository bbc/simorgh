import 'isomorphic-fetch';
import path from 'ramda/src/path';

import getCookieOvenUrl from './getCookieOvenEndpoint';

export default async (policy, logger) => {
  const origin = path(['location', 'origin'], window);

  if (origin) {
    const [outsideUkCookieOven, ukCookieOven] = getCookieOvenUrl({
      origin,
      policy,
    });

    try {
      await Promise.all([fetch(outsideUkCookieOven), fetch(ukCookieOven)]);
    } catch (e) {
      const log = logger || console;

      log.error(e);
    }
  }
};
