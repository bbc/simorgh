import getOriginContext from '#app/contexts/RequestContext/getOriginContext';

const isOfflineMode = (url: string): boolean => {
  const { origin } = getOriginContext(null);

  try {
    const mode = new URL(url, origin).searchParams.get('mode');
    return mode === 'offline';
  } catch {
    return false;
  }
};

export default isOfflineMode;
