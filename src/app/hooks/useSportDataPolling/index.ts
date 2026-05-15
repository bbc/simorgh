import { useEffect, useState } from 'react';
import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import makeRequest from './makeRequest/makeRequest';
// import fakeRequest from './fakeRequest';

export const POLLING_INTERVAL = 15000; // 15s - same polling interval as useLivePagePolling

const useSportDataPolling = (
  sportData: HeadToHeadV2Data,
  enableFeature: boolean,
) => {
  const sportDataUrn = sportData.urn;
  const [currentSportData, setCurrentData] =
    useState<HeadToHeadV2Data>(sportData);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false) return;

      const polledSportsData = await makeRequest(sportDataUrn);

      if (polledSportsData != null) {
        setCurrentData(polledSportsData);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [enableFeature, sportDataUrn]);

  return { currentSportData };
};

export default useSportDataPolling;
