/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import LiveSummary from '#app/components/LiveSummary';
import TimeStampContainer from '#app/legacy/psammead/psammead-timestamp-container/src';
import { PostHeadingBlock } from '#nextjs/pages/[service]/live/[id]/Post/types';
import { pathOr } from 'ramda';
import { OptimoBlock } from '#app/models/types/optimo';
import P from '#app/legacy/components/Promo/body';
import isTenHoursAgo from '#app/lib/utilities/isTenHoursAgo';
import Heading from '#app/components/Heading';
import LivePulse from '#app/components/LivePulse';
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
    livepage?: {
      data: {
        title: string;
        description: string;
        liveTextStream: any;
        metadata: any;
      };
    };
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
    livepage,
    title,
    description,
    metadata: { atiAnalytics },
  } = pageData;
  let { curations } = pageData;
  console.log('HELLLOOO', livepage);
  // EXPERIMENT: Homepage Time of Day Adaptive Curations
  const timeOfDayExperimentName = 'newswb_ws_tod_homepage';
  const timeOfDayVariant = useOptimizelyVariation({
    experimentName: timeOfDayExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });
  const t = livepage?.data.title;
  const posts = livepage?.data.liveTextStream.content.data.results;

  const str = livepage?.data.metadata.atiAnalytics.pageIdentifier;
  const parts = str.split('.');
  const id = parts[1];
  const livepageurl = `/hausa/live/${id}`;
  const recentPosts = posts.slice(0, 4);
  if (timeOfDayVariant === 'homepage_time_of_day_a') {
    curations = reorderCurations({
      curations,
      service,
    });
  }

  const itemList = getItemList({ curations, name: brandName });
  const {
    timezone,
    datetimeLocale,
    serviceDatetimeLocale,
    altCalendar,
    script,
    translations: {
      liveExperiencePage: {
        breaking = 'Breaking',
        postDateTimeFormat,
        postDateFormat,
      },
    },
  } = use(ServiceContext);

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
        <div css={styles.timeline}>
          <a href={livepageurl}>
            <Heading level={3}>{t}</Heading>
          </a>
          <div css={styles.livesummarydetails}>
            {recentPosts.map((post, index) => {
              const headerBlocks = pathOr<PostHeadingBlock[]>(
                [],
                ['header', 'model', 'blocks'],
                post,
              );

              const timestamp = post?.dates?.curated ?? '';
              const firstHeadingText =
                headerBlocks?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]?.model
                  ?.text;
              const locale = serviceDatetimeLocale || datetimeLocale;

              return (
                <div
                  key={post.id}
                  css={
                    index !== 3 ? styles.timelineItem : styles.timelineItemLast
                  }
                >
                  <p css={styles.livesummary}>
                    <LivePulse width="24" height="24" />
                    <TimeStampContainer
                      css={styles.timeStamp}
                      timestamp={timestamp}
                      dateTimeFormat={postDateTimeFormat || 'DD MMMM YYYY'}
                      format={postDateFormat || 'D MMMM YYYY'}
                      locale={locale}
                      timezone={timezone}
                      service={service}
                      script={script}
                      altCalendar={altCalendar}
                      padding={false}
                      isRelative={isTenHoursAgo(new Date(timestamp).getTime())}
                    />
                    {firstHeadingText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
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
