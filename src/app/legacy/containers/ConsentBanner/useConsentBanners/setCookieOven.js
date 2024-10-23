import 'isomorphic-fetch';
import { path } from 'rambda';

import getCookieOvenEndpoints from './getCookieOvenEndpoints';

export default async policy => {
  const origin = path(['location', 'origin'], window);

  if (origin) {
    const cookieOvenEndpoints = getCookieOvenEndpoints({
      origin,
      policy,
    });

    try {
      await Promise.all(cookieOvenEndpoints.map(endpoint => fetch(endpoint)));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
};
