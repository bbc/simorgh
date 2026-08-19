import { useEffect, useState } from 'react';
import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import fetchPolledData from '#app/lib/utilities/fetchPolledData';

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

      const encodedUrn = encodeURIComponent(sportDataEventUrn);
      const params = { sportDataEventUrn: encodedUrn };
      const response = await fetchPolledData<{ sportDataEvent: HeadToHeadV2Data }>('sport', { params });

      if (response?.data?.sportDataEvent) {
        setCurrentData(response.data.sportDataEvent);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [enableFeature, sportDataEventUrn]);

  return { currentSportData };
};

export default useSportDataPolling;
