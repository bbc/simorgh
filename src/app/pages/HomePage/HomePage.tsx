/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use } from 'react';
import { jsx } from '@emotion/react';
import { getMostReadEndpoint } from '#app/lib/utilities/getUrlHelpers/getMostReadUrls';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import ATIAnalytics from '../../components/ATIAnalytics';
import {
  Curation,
  VisualProminence,
  VisualStyle,
} from '../../models/types/curationData';
import { ATIData } from '../../components/ATIAnalytics/types';
import HomeCuration from '../../components/Curation';
import Ad from '../../components/Ad';
import MPU from '../../components/Ad/MPU';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import MetadataContainer from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import getItemList from '../../lib/seoUtils/getItemList';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import getNthCurationByStyleAndProminence from '../utils/getNthCurationByStyleAndProminence';
import getIndexOfFirstNonBanner from '../utils/getIndexOfFirstNonBanner';
import reorderCurations from './utils/reorderCurations';

export interface HomePageProps {
  pageData: {
    id?: string;
    title: string;
    curations: Curation[];
    description: string;
    metadata: {
      atiAnalytics: ATIData;
      type: string;
    };
  };
}

const HomePage = ({ pageData }: HomePageProps) => {
  const {
    translations,
    product,
    serviceLocalizedName,
    homePageTitle,
    lang,
    brandName,
    service,
  } = use(ServiceContext);
  const { topStoriesTitle, home } = translations;
  const {
    title,
    description,
    metadata: { atiAnalytics },
  } = pageData;
  let { curations } = pageData;

  // EXPERIMENT: Homepage Time of Day Adaptive Curations
  const timeOfDayExperimentName = 'newswb_ws_tod_homepage';
  const timeOfDayVariant = useOptimizelyVariation({
    experimentName: timeOfDayExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  // if service is Hindi or Tamil and optimizely variant is set to 'variantA' then reorder curations
  if (timeOfDayVariant === 'homepage_time_of_day_a') {
    curations = reorderCurations({
      curations,
      service,
    });
  }

  const itemList = getItemList({ curations, name: brandName });

  const MOST_READ_ENDPOINT = getMostReadEndpoint({
    service,
    variant: null,
    isBff: true,
  });

  React.useEffect(() => {
    const fetchMostReadData = async () => {
      try {
        console.log('Debug: MOST_READ_ENDPOINT value:', MOST_READ_ENDPOINT);
        console.log('Debug: Starting fetch call to MOST_READ_ENDPOINT');
        const response = await fetch(MOST_READ_ENDPOINT);
        console.log('Debug: Fetch call completed with status:', response.status);
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Debug: Fetched Most Read Data:', data);
      } catch (error) {
        console.error('Debug: Error fetching Most Read Data:', error);
      }
    };

    fetchMostReadData();
  }, [MOST_READ_ENDPOINT]);

  return (
    <>
      <ChartbeatAnalytics title={title} />
      <MetadataContainer
        title={homePageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData
        type="CollectionPage"
        seoTitle={title}
        headline={title}
        entities={[itemList]}
      />
      <Ad slotType="leaderboard" />
      <main role="main" css={styles.main}>
        <ATIAnalytics atiData={atiAnalytics} />
        <VisuallyHiddenText id="content" tabIndex={-1} as="h1">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text">
            <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
          </span>
        </VisuallyHiddenText>
        <div css={styles.inner}>
          <div css={styles.margins}>
            {curations.map(
              (
                {
                  visualProminence,
                  summaries,
                  curationId,
                  title: curationTitle,
                  link,
                  position,
                  visualStyle,
                  ...curationProps
                }: Curation,
                index: number,
              ) => {
                const nthCurationByStyleAndProminence =
                  getNthCurationByStyleAndProminence({
                    curations,
                    position,
                    visualStyle,
                    visualProminence,
                  });
                const indexOfFirstNonBanner =
                  getIndexOfFirstNonBanner(curations);
                return (
                  <React.Fragment key={`${curationId}-${position}`}>
                    <HomeCuration
                      visualStyle={visualStyle as VisualStyle}
                      visualProminence={visualProminence as VisualProminence}
                      summaries={summaries || []}
                      title={curationTitle}
                      topStoriesTitle={topStoriesTitle}
                      position={position}
                      link={link}
                      curationLength={curations?.length}
                      nthCurationByStyleAndProminence={
                        nthCurationByStyleAndProminence
                      }
                      renderVisuallyHiddenH2Title={position === 0}
                      curationId={curationId}
                      timeOfDayVariant={timeOfDayVariant}
                      {...curationProps}
                    />
                    {index === indexOfFirstNonBanner && <MPU />}
                  </React.Fragment>
                );
              },
            )}
          </div>
        </div>
      </main>
      {timeOfDayVariant && <OptimizelyPageMetrics trackPageView />}
    </>
  );
};

export default HomePage;
