import React from 'react';
import { addSetAtUserIdCookie } from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';

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

    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    const epochTimestamp = now.getTime().toString();
    const timestamp = [hours, mins, secs].join('x');

    const user = window.setAtUserIdCookie();

    const processedReverbUrl = reverbUrl
      .replace('{screenResolutionColourDepth}', '0x0x0x0')
      .replace('{browserViewportResolution}', '0x0')
      .replace('{timestamp}', timestamp)
      .replace('{language}', 'unknown')
      .replaceAll('{referrer}', '')
      .replace('{idclient}', `${user.val}`)
      .replace('{epochTimestamp}', epochTimestamp)
      .replace('{forwardingLink}', '')
      .replaceAll('ref=&', '')
      .replaceAll(
        '~COMPONENT_NAME_PLACEHOLDER~',
        `TEST7-REDIRECT-${normalisedEct}`,
      );

    switch (normalisedEct) {
      case 'slow-2g':
      case '2g':
      case '3g':
        window.sendStaticBeacon(processedReverbUrl);
        window.location.replace(toLitePath);
        break;
      default:
        break;
    }
  }
};

// THIS COMPONENT IS ONLY TO BE USED WITH CANONICAL RENDERERS
// DO NOT USE IT WITH LITE AND AMP RENDERERS
export default ({ reverbUrl }: { reverbUrl: string }) => {
  return (
    <script>
      {`
        window.addEventListener('load', () => {
          ${addSendStaticBeaconToWindow()};
          (${addSetAtUserIdCookie.toString()})();
          (${redirectScript.toString()})(window, '${reverbUrl}')
        })
      `}
    </script>
  );
};
