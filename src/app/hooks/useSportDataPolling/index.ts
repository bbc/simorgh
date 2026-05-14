import { useEffect, useState } from 'react';
// import makeRequest from './makeRequest/makeRequest';
import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import fakeRequest from './fakeRequest';

export const POLLING_INTERVAL = 5000; // TODO - confirm the polling interval with the team, 5s is just a placeholder for now

const isSameSportData = (
  currentSportData: HeadToHeadV2Data | null,
  polledSportData: HeadToHeadV2Data,
) => JSON.stringify(currentSportData) === JSON.stringify(polledSportData);

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

      // TEMP
      const polledSportsData = fakeRequest();

      if (polledSportsData != null) {
        setCurrentData(currentData => {
          if (isSameSportData(currentData, polledSportsData)) {
            // eslint-disable-next-line no-console
            console.log('data is unchanged, not re-rendering');
            return currentData;
          }

          // eslint-disable-next-line no-console
          console.log('data has changed. component is re-rendered');
          return polledSportsData;
        });
      }
      // REAL
      //   const polledSportsData = await makeRequest(sportDataId);

      //   if (polledSportsData != null) {
      //     setCurrentData(polledSportsData);
      //   }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [enableFeature, sportDataUrn]);

  return { currentSportData }; // TODO - make more readable?
};

export default useSportDataPolling;
