import { useEffect, useState } from 'react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
// import makeRequest from './makeRequest/makeRequest';
import fakeRequest from './fakeRequest';

export const POLLING_INTERVAL = 5000; // TODO - confirm the polling interval with the team, 5s is just a placeholder for now

type SportDataEventContent = NonNullable<
  ComponentProps['pageData']['sportDataEventContent']
>;
type SportDataEvent =
  SportDataEventContent['content']['data']['sportDataEvent'];

const isSameSportData = (
  currentSportData: SportDataEvent | null,
  polledSportData: SportDataEvent,
) => JSON.stringify(currentSportData) === JSON.stringify(polledSportData);

const useSportDataPolling = (
  pageData: ComponentProps['pageData'],
  enableFeature: boolean,
) => {
  const initialSportData =
    pageData.sportDataEventContent?.content?.data?.sportDataEvent ?? null;
  const sportDataId = pageData.sportDataEventContent?.id;

  const [currentSportData, setCurrentData] = useState(initialSportData);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false || !sportDataId) return;
      //   if (currentStreamData?.page?.index !== 1) return; // TODO - confirm with the team if we should only poll when the user is on the first page of the live text stream, this was a requirement for the live text stream polling but may not be relevant for sport data

      // const polledSportsData = await makeRequest(sportDataId);
      const polledSportsData = fakeRequest(); // TEMP

      if (polledSportsData != null) {
        // setNewData(polledSportsData); // Option C - do not check
        setCurrentData(currentData => {
          if (isSameSportData(currentData, polledSportsData)) {
            // eslint-disable-next-line no-console
            console.log('data is unchanged, not re-rendering');
            return currentData;
          }

          // eslint-disable-next-line no-console
          console.log('data has changed. component is re-rendered');
          return polledSportsData;
        }); // option B - checks with logs

        // setCurrentData(currentData =>
        //   isSameSportData(currentData, polledSportsData)
        //     ? currentData
        //     : polledSportsData,
        // ); // Option B - like A without logs
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [enableFeature, sportDataId]);

  return { currentSportData }; // TODO - make more readable?
};

export default useSportDataPolling;
