import cookieOvenUrl from './cookieOvenUrl';
// import 'isomorphic-fetch';

const cookieOvenFetch = async (cookie, value, logger) => {
  if (window.location && window.location.origin) {
    try {
      await fetch(
        `${cookieOvenUrl(window.location.origin)}/${cookie}/${value}`,
      );
    } catch (e) {
      const log = logger || console;
      log.error(e);
    }
  }
};

export default cookieOvenFetch;
