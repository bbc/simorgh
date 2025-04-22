import React from 'react';
import processClientDeviceAndSendStaticBeacon from '#src/server/utilities/liteATITracking';
import clickTracking from '#src/server/utilities/liteATITracking/clickTracking';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import viewTracking from '#src/server/utilities/liteATITracking/viewTracking';

const trackingScripts = ({
  trackOnlyStaticCanonical = false,
  trackComponentViews = true,
} = {}) => {
  return `
    window.addEventListener('load', function () {
      const isOperaMini = ${isOperaProxy.toString()}();
      const isComponentTrackingEnabled = ${trackOnlyStaticCanonical} ? isOperaMini : true;
      
      if (!isComponentTrackingEnabled) {
        return;
      }

      (${processClientDeviceAndSendStaticBeacon.toString()})();

      if (${trackComponentViews}) {
        (${viewTracking.toString()})();
      }

      (${clickTracking.toString()})();
    });
  `;
};

const ComponentTrackingTemplate = ({
  trackOnlyStaticCanonical = false,
  trackComponentViews = true,
}) => {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `${trackingScripts({
          trackOnlyStaticCanonical,
          trackComponentViews,
        })}`,
      }}
    />
  );
};

export default ComponentTrackingTemplate;
