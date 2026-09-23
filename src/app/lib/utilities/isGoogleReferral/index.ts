import onClient from '#app/lib/utilities/onClient';

const isGoogleReferral = () => {
  if (!onClient()) return false;

  const debugReferrer = new URLSearchParams(window.location.search).get(
    'debugReferrer',
  );

  if (debugReferrer === 'search') return true;

  try {
    const { hostname } = new URL(document.referrer);

    return hostname.includes('google.');
  } catch {
    return false;
  }
};

export default isGoogleReferral;
