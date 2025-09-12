/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use } from 'react';
import { jsx } from '@emotion/react';
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

const extractId = (id?: string | null) => (id ?? '').split(':').pop();

const HomePage = ({ pageData }: HomePageProps) => {
  const {
    translations,
    product,
    serviceLocalizedName,
    homePageTitle,
    lang,
    brandName,
  } = use(ServiceContext);
  const { topStoriesTitle, home } = translations;
  const {
    title,
    description,
    curations,
    metadata: { atiAnalytics },
  } = pageData;

  // EXPERIMENT: Homepage Read Time
  const readTimeExperimentName = 'newswb_ws_homepage_read_time';
  const readTimeVariant = useOptimizelyVariation({
    experimentName: readTimeExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const itemList = getItemList({ curations, name: brandName });

  const findMostReadCuration = curations.find(
    curation => !!curation.mostRead?.items?.length,
  );

  const mostReadItemId =
    extractId(findMostReadCuration?.mostRead?.items?.[0].id ?? null) ?? null;

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
                  mostRead,
                  radioSchedule,
                  embed,
                  portraitVideo,
                },
                index,
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
                      mostRead={mostRead}
                      radioSchedule={radioSchedule}
                      nthCurationByStyleAndProminence={
                        nthCurationByStyleAndProminence
                      }
                      embed={embed}
                      portraitVideo={portraitVideo}
                      renderVisuallyHiddenH2Title={position === 0}
                      curationId={curationId}
                      {...(readTimeVariant && { readTimeVariant })}
                      mostReadItemId={mostReadItemId}
                    />
                    {index === indexOfFirstNonBanner && <MPU />}
                  </React.Fragment>
                );
              },
            )}
          </div>
        </div>
      </main>
      {readTimeVariant && <OptimizelyPageMetrics trackPageView />}
    </>
  );
};

export default HomePage;
