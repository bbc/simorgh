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

      // <Temp>
      // class OperaMiniMock {
      //     get [Symbol.toStringTag]() {
      //       return 'OperaMini';
      //     }
      //   }
      // window.operamini = new OperaMiniMock();
      // </Temp>

      const isOperaMini = ${isOperaProxy.toString()}();

      const alertMessage = ['liteTrackingScripts:', 'isOperaMini:', isOperaMini].join(' ')
      
      alert(alertMessage);
      
      const isLiteTrackingEnabled = ${onlyOperaMini} ? isOperaMini : true;
      
      console.log('liteTrackingScripts: onlyOperaMini:', ${onlyOperaMini}, 'isOpera:', isOperaMini, "isLiteTrackingEnabled:", isLiteTrackingEnabled);


      if (!isLiteTrackingEnabled) {
        console.log('liteTrackingScripts: NOT LOADED');
        return;
      }

      (${processClientDeviceAndSendLite.toString()})();

      if (${trackViews}) {
        console.log('liteTrackingScripts: Load - trackViews');
        (${viewTracking.toString()})();
      }

      if (${trackClicks}) {
        console.log('liteTrackingScripts: Load - trackClicks');
        (${clickTracking.toString()})();
      }
    });
  `;
};

const LiteTrackingScripts = ({
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

export default LiteTrackingScripts;
