import React from 'react';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import clickTracking from '#app/lib/analyticsUtils/staticATITracking/clickTracking';
import viewTracking from '#app/lib/analyticsUtils/staticATITracking/viewTracking';
import { addProcessClientDeviceAndSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';

type Props = {
  enableStaticClickTrackingOnOperaMiniOnly: boolean;
  trackComponentViews: boolean;
};

const trackingScripts = ({
  enableStaticClickTrackingOnOperaMiniOnly,
  trackComponentViews,
}: Props) => {
  return `
    window.addEventListener('load', function () {
      var isComponentTrackingEnabled = true;
      var isStaticClickTrackingOnOperaMiniOnlyEnabled = ${enableStaticClickTrackingOnOperaMiniOnly};
      var isComponentViewTrackingEnabled = ${trackComponentViews};

      if (isStaticClickTrackingOnOperaMiniOnlyEnabled) {
        isComponentTrackingEnabled = ${isOperaProxy.toString()}();
      }      

      if (isComponentTrackingEnabled) {
        (${addProcessClientDeviceAndSendStaticBeaconToWindow.toString()})();

        if (isComponentViewTrackingEnabled) {
          (${viewTracking.toString()})();
        }

        (${clickTracking.toString()})();
      }
    });
  `;
};

/**
 * Component for injecting component tracking scripts into the page.
 *
 * @param {boolean} enableStaticClickTrackingOnOperaMiniOnly - Enables static click tracking only on Opera Mini browsers.
 *   If true, tracking will only occur on Opera Mini; otherwise, it will occur on all browsers.
 * @param {boolean} trackComponentViews - Enables tracking of component views.
 */
const ComponentTracking = ({
  enableStaticClickTrackingOnOperaMiniOnly,
  trackComponentViews,
}: Props) => {
  return (
    <script
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `${trackingScripts({
          enableStaticClickTrackingOnOperaMiniOnly,
          trackComponentViews,
        })}`,
      }}
    />
  );
};

export default ComponentTracking;
