import { useEffect, useState } from 'react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
// import makeRequest from './makeRequest/makeRequest';
import fakeRequest from './fakeRequest';

export const POLLING_INTERVAL = 5000; // TODO - confirm the polling interval with the team, 5s is just a placeholder for now

const useSportDataPolling = (
  pageData: ComponentProps['pageData'],
  enableFeature: boolean,
) => {
  const initialSportData =
    pageData.sportDataEventContent?.content?.data?.sportDataEvent ?? null;
  const sportDataId = pageData.sportDataEventContent?.id || 'fakeID'; // TODO - very hacky fix - will need to handle this scenario
  //   const firstPostUrn = initialStreamData?.results?.[0]?.urn;

  const [currentSportData, setCurrentData] = useState(initialSportData);
  const [newData, setNewData] = useState(initialSportData);
  const [hasPendingUpdate2, setHasPendingUpdate2] = useState(false);
  //   const [currentFirstPostUrn, setFirstPostUrn] = useState(firstPostUrn);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false) return;
      //   if (currentStreamData?.page?.index !== 1) return; // TODO - confirm with the team if we should only poll when the user is on the first page of the live text stream, this was a requirement for the live text stream polling but may not be relevant for sport data

      //   const polledSportsData = await makeRequest(sportDataId);
      const polledSportsData = fakeRequest(); // TEMP
      console.log('polledSportsData', polledSportsData); // logs the response from fakeRequest, this should be removed once makeRequest is implemented and we have real responses to work with

      //   if (polledStream != null) {
      //     const polledStreamFirstPostUrn = polledStream.results?.[0]?.urn;
      //     if (polledStreamFirstPostUrn !== currentFirstPostUrn) {
      //       setHasPendingUpdate(true);
      //       setNewData(polledStream);
      //       setFirstPostUrn(polledStreamFirstPostUrn);
      //     }
      //   }

      if (polledSportsData != null) {
        setHasPendingUpdate2(true);
        setNewData(polledSportsData);
        // TODO - determine how we will identify if the polled sports data is different from the current sports data, and update the state accordingly
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [
    // currentFirstPostUrn,
    // currentStreamData?.page?.index,
    enableFeature,
    sportDataId,
  ]);

  const applyPendingUpdate2 = () => {
    if (hasPendingUpdate2) {
      setHasPendingUpdate2(false);
      setCurrentData(newData);
    }
  };

  return { currentSportData, hasPendingUpdate2, applyPendingUpdate2 };
};

export default useSportDataPolling;
