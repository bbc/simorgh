import cookieOvenUrl from './cookieOvenUrl';
import 'isomorphic-fetch';

const cookieOvenFetch = async (policy, logger) => {
  if (window.location && window.location.origin) {
    try {
      await fetch(
        `${cookieOvenUrl(
          window.location.origin,
          false,
        )}/cookieoven?policy=${policy}`,
      );
      await fetch(
        `${cookieOvenUrl(
          window.location.origin,
          true,
        )}/cookieoven?policy=${policy}`,
      );
    } catch (e) {
      const log = logger || console;
      log.error(e);
    }
  }
};

export default cookieOvenFetch;
