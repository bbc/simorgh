/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

import { Curation as CurationType } from '#app/models/types/curationData';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import getAgent from '#server/utilities/getAgent';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import Curation from '#app/components/Curation';

import styles from './ArticlePage.styles';

const getPageData = async ({
  id,
  service,
  pageType,
}: {
  id: string;
  service: string;
  pageType: string;
}) => {
  try {
    const { json } = await fetchDataFromBFF({
      pathname: `/mundo/articles/somethingweirdhere`,
      pageType: 'topic',
      service: 'mundo',
    });
    return json ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }
};

type PersonalisedContentProps = {
  service: string;
  country: string;
  sendOptimizelyEvents: boolean;
};

const countrySpecificTopics: Record<string, string> = {
  mx: 'c340qyp6yggt',
  co: 'c404v5gz1rkt',
  cl: 'c340qyppkk8t',
  ar: 'c7zp57yy6dzt',
  pe: 'c404v5gdw2zt',
  es: 'c6vzy3wd189t',
  ve: 'cpzd49v9rd1t',
  ec: 'cg72618r047t',
};

const fallbackTopicId = 'c7zp57yyz25t';

const PersonalisedContent = ({
  service,
  country,
  sendOptimizelyEvents,
}: PersonalisedContentProps) => {
  const [topicData, setTopicData] = useState<CurationType | null>(null);

  const availableCountries = Object.keys(countrySpecificTopics);
  const topicIdToFetch =
    country && availableCountries.includes(country)
      ? countrySpecificTopics[country]
      : fallbackTopicId;

  useEffect(() => {
    let isMounted = true;
    getPageData({
      id: topicIdToFetch,
      service,
      pageType: TOPIC_PAGE,
    }).then(data => {
      if (isMounted) setTopicData(data);
    });
    return () => {
      isMounted = false;
    };
  }, [topicIdToFetch, service]);

  const {
    palette: { GREY_2 },
  } = useTheme();

  return (
    <div css={styles.secondaryColumn}>
      {/* Replace with actual rendering logic */}
      {topicData ? (
        <Curation curation={topicData} />
      ) : (
        'Loading personalised content...'
      )}
    </div>
  );
};

export default PersonalisedContent;
