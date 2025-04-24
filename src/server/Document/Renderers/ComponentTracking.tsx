import React from 'react';
import processClientDeviceAndSendStaticBeacon from '#src/server/utilities/staticATITracking';
import clickTracking from '#src/server/utilities/staticATITracking/clickTracking';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import viewTracking from '#src/server/utilities/staticATITracking/viewTracking';

const trackingScripts = ({
  enableStaticClickTrackingOnOperaMini,
  trackComponentViews,
}: {
  enableStaticClickTrackingOnOperaMini: boolean;
  trackComponentViews: boolean;
}) => {
  return `
    window.addEventListener('load', function () {
      let isComponentTrackingEnabled = true;

      if (${enableStaticClickTrackingOnOperaMini}) {
        isComponentTrackingEnabled = ${isOperaProxy.toString()}();
      }      

      if (isComponentTrackingEnabled) {
        (${processClientDeviceAndSendStaticBeacon.toString()})();

        if (${trackComponentViews}) {
          (${viewTracking.toString()})();
        }

        (${clickTracking.toString()})();
      }
    });
  `;
};

type Props = {
  enableStaticClickTrackingOnOperaMini: boolean;
  trackComponentViews: boolean;
};

const ComponentTracking = ({
  enableStaticClickTrackingOnOperaMini,
  trackComponentViews,
}: Props) => {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `${trackingScripts({
          enableStaticClickTrackingOnOperaMini,
          trackComponentViews,
        })}`,
      }}
    />
  );
};

export default ComponentTracking;
