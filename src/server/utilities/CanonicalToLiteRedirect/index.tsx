import React from 'react';
import { addSetAtUserIdCookie } from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';

export const redirectScript = (window: Window, reverbUrl: string) => {
  const { pathname } = window.location;

  const allowList = ['/pidgin/articles/czrzwn80zjmo'];
  if (
    window?.navigator?.connection?.effectiveType &&
    allowList.includes(pathname)
  ) {
    const toLitePath = `${pathname}.lite`;
    const ect = window.navigator.connection.effectiveType;
    const normalisedEct = ect.toLocaleLowerCase();

    const NO_FIELD = 'undefined';
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    const epochTimestamp = now.getTime().toString();
    const timestamp = [hours, mins, secs].join('x');

    const user = window.setAtUserIdCookie();

    const processedReverbUrl = reverbUrl
      .replace('{screenResolutionColourDepth}', NO_FIELD)
      .replace('{browserViewportResolution}', NO_FIELD)
      .replace('{timestamp}', timestamp)
      .replace('{language}', NO_FIELD)
      .replaceAll('{referrer}', NO_FIELD)
      .replace('{idclient}', NO_FIELD)
      .replace('{epochTimestamp}', epochTimestamp)
      .replace('{forwardingLink}', NO_FIELD)
      .replaceAll('~COMPONENT_NAME_PLACEHOLDER~', `REDIRECT-${normalisedEct}`);

    console.log('CHECK THIS', user);
    switch (normalisedEct) {
      case 'slow-2g':
      case '2g':
      case '3g':
        // send tracking
        window.location.replace(toLitePath);
        break;
      default:
        break;
    }
  }
};

// THIS COMPONENT IS ONLY TO BE USED WITH CANONICAL REDNERERS
// DO NOT USE IT WITH LITE AND AMP RENDERERS
export default ({ reverbUrl }: { reverbUrl: string }) => {
  return (
    <script>
      {`
        window.addEventListener('load', () => {
          (${addSetAtUserIdCookie.toString()})();
          (${redirectScript.toString()})(window, '${reverbUrl}')
        })
      `}
    </script>
  );
};
