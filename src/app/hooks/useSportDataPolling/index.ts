import { useEffect, useState } from 'react';

import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import makeRequest from './makeRequest';

export const POLLING_INTERVAL = 15000;

const useSportDataPolling = (
  sportData: HeadToHeadV2Data,
  enableFeature: boolean,
) => {
  const sportDataEventUrn = sportData.urn;
  const [currentSportData, setCurrentData] =
    useState<HeadToHeadV2Data>(sportData);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false) return;

      const polledSportData = await makeRequest(sportDataEventUrn);

      if (polledSportData != null) {
        setCurrentData(polledSportData);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [enableFeature, sportDataEventUrn]);

  return { currentSportData };
};

export default useSportDataPolling;
