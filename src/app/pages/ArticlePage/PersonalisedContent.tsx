/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import Curation from '#components/Curation';
import { Curation } from '#app/models/types/curationData';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import getAgent from '#server/utilities/getAgent';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';

import styles from './ArticlePage.styles';

const getPageData = async ({
      id,
      service,
      pageType,
  }) => {
    try {
      const { status, json } = await fetchDataFromBFF({
          pathname: '/mundo/articles/somethingweirdhere',
          pageType: 'topic',
          service: 'mundo',
        });
        return json ?? null;
    }
    catch (err) {
        console.error(err);
    }
}


const PersonalisedContent = ({
  service,
  country,
  sendOptimizelyEvents,
}: {
  service: string;
  country: string;
  sendOptimizelyEvents: boolean;
}) => {
  
  const countrySpecificTopics = {
    "mx": "c340qyp6yggt",
    "co": "c404v5gz1rkt",
    "cl": "c340qyppkk8t",
    "ar": "c7zp57yy6dzt",
    "pe": "c404v5gdw2zt",
    "es": "c6vzy3wd189t",
    "ve": "cpzd49v9rd1t",
    "ec": "cg72618r047t",
  };
  
  const avaiableCountries = Object.keys(countrySpecificTopics);
  
  const topicIdToFetch = country && avaiableCountries.includes(country) ? countrySpecificTopics[country] : 'c7zp57yyz25t';

  const countrySpecificTopicData = await getPageData({
    id: topicIdToFetch,
    service,
    pageType: TOPIC_PAGE,
  });
  console.log('countrySpecificTopicData', countrySpecificTopicData);

  const {
    palette: { GREY_2 },
  } = useTheme();


  return (
    <div css={styles.secondaryColumn}>
        here
    </div>
  );
};

export default PersonalisedContent;
