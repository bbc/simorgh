import React from 'react';

import processClientDeviceAndSendLite from '#src/server/utilities/liteATITracking';
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

      // TODO - temp comment 
      const alertMessage = ['trackingScripts', 'isOperaMini', isOperaMini, 'isComponentTrackingEnabled', isComponentTrackingEnabled].join(': ')
      alert(alertMessage);
      console.log('liteTrackingScripts: trackOnlyStaticCanonical:', ${trackOnlyStaticCanonical}, 'isOpera:', isOperaMini, "isComponentTrackingEnabled:", isComponentTrackingEnabled);
      
      
      if (!isComponentTrackingEnabled) {
        return;
      }

      (${processClientDeviceAndSendLite.toString()})();

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
