import 'isomorphic-fetch';
import getCookieOvenUrl from './getCookieOvenUrl';

const cookieOvenFetch = async (policy, logger) => {
  if (window.location && window.location.origin) {
    try {
      await Promise.all([
        fetch(
          `${getCookieOvenUrl(window.location.origin, {
            switchDomain: false,
          })}/cookieoven?policy=${policy}`,
        ),
        fetch(
          `${getCookieOvenUrl(window.location.origin, {
            switchDomain: true,
          })}/cookieoven?policy=${policy}`,
        ),
      ]);
    } catch (e) {
      const log = logger || console;
      log.error(e);
    }
  }
};

export default cookieOvenFetch;
