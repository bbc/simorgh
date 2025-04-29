import React from 'react';
import processClientDeviceAndSendStaticBeacon from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';
import clickTracking from '#app/lib/analyticsUtils/staticATITracking/clickTracking';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import viewTracking from '#app/lib/analyticsUtils/staticATITracking/viewTracking';

type Props = {
  enableStaticClickTrackingOnOperaMiniOnly: boolean;
  trackComponentViews: boolean;
};

const addInlineScript = (script: { toString: () => string }) => {
  return <script type="text/javascript">{script.toString()}</script>;
};

const trackingScripts = ({
  enableStaticClickTrackingOnOperaMiniOnly,
  trackComponentViews,
}: Props) => {
  return `
    window.addEventListener('load', function () {
      let isComponentTrackingEnabled = true;

      if (${enableStaticClickTrackingOnOperaMiniOnly}) {
        isComponentTrackingEnabled = ${isOperaProxy.toString()}();
      }      

      if (isComponentTrackingEnabled) {
        if (${trackComponentViews}) {
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
    <>
      {addInlineScript(processClientDeviceAndSendStaticBeacon)}
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `${trackingScripts({
            enableStaticClickTrackingOnOperaMiniOnly,
            trackComponentViews,
          })}`,
        }}
      />
    </>
  );
};

export default ComponentTracking;
