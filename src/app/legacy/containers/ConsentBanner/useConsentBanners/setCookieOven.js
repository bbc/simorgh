import getCookieOvenEndpoints from './getCookieOvenEndpoints';

export default async policy => {
  const { origin } = window.location;

  if (origin) {
    const cookieOvenEndpoints = getCookieOvenEndpoints({
      origin,
      policy,
    });

    try {
      await Promise.all(cookieOvenEndpoints.map(endpoint => fetch(endpoint)));
    } catch (_e) {}
  }
};
