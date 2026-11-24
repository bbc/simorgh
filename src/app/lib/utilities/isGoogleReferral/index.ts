import onClient from '#app/lib/utilities/onClient';

const isGoogleReferral = () => {
  if (!onClient()) return false;

  try {
    const { hostname } = new URL(document.referrer);

    return hostname.includes('google.');
  } catch {
    return false;
  }
};

export default isGoogleReferral;
