import React from 'react';

import processClientDeviceAndSendLite from '#src/server/utilities/liteATITracking';
import clickTracking from '#src/server/utilities/liteATITracking/clickTracking';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import viewTracking from '#src/server/utilities/liteATITracking/viewTracking';

const liteTrackingScripts = ({
  onlyOperaMini = false,
  trackViews = true,
  trackClicks = true,
} = {}) => {
  return `
    window.addEventListener('load', function () {
      const isOperaMini = ${isOperaProxy.toString()}();

      // TODO - temp comment
      const alertMessage = ['liteTrackingScripts:', 'isOperaMini:', isOperaMini].join(' ')
      alert(alertMessage);
      
      const isLiteTrackingEnabled = ${onlyOperaMini} ? isOperaMini : true;
      
      // TODO - temp comment
      console.log('liteTrackingScripts: onlyOperaMini:', ${onlyOperaMini}, 'isOpera:', isOperaMini, "isLiteTrackingEnabled:", isLiteTrackingEnabled);


      if (!isLiteTrackingEnabled) {
      // TODO - temp comment
        console.log('liteTrackingScripts: NOT LOADED');
        return;
      }

      (${processClientDeviceAndSendLite.toString()})();

      if (${trackViews}) {
        (${viewTracking.toString()})();
      }

      if (${trackClicks}) {
        (${clickTracking.toString()})();
      }
    });
  `;
};

const LiteTrackingTemplate = ({
  onlyOperaMini = false,
  trackViews = true,
  trackClicks = true,
}) => {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `${liteTrackingScripts({
          onlyOperaMini,
          trackViews,
          trackClicks,
        })}`,
      }}
    />
  );
};

export default LiteTrackingTemplate;
