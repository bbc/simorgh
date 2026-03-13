import type { Component } from 'react';
import { use } from 'react';
import path from 'ramda/src/path';
import is from 'ramda/src/is';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import StyledRadioHeadingContainer from '#containers/OnDemandHeading/StyledRadioHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import EpisodeImage from '#containers/OnDemandImage';
import RadioScheduleContainer from '#containers/RadioSchedule';
import RecentAudioEpisodes from '#containers/EpisodeList/RecentAudioEpisodes';
import FooterTimestamp from '#containers/OnDemandFooterTimestamp';
import PodcastExternalLinks from '#containers/PodcastExternalLinks';
import MediaLoader from '#app/components/MediaLoader';
import { PageTypes } from '#app/models/types/global';
import { RadioScheduleData } from '#app/models/types/radioSchedule';
import { ContentType } from '#app/components/ChartbeatAnalytics/types';
import {
  EpisodeAvailability,
  OnDemandAudioBlock,
} from '#app/models/types/media';
import { ATIData } from '#app/components/ATIAnalytics/types';
import styles from './index.styles';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';

const SKIP_LINK_ANCHOR_ID = 'content';

export interface OnDemandAudioProps {
  pageData: {
    mediaBlocks: OnDemandAudioBlock[];
    metadata: {
      type: PageTypes;
      atiAnalytics?: ATIData;
    };
    episodeAvailability: EpisodeAvailability;
    isPodcast: boolean;
    language: string;
    brandTitle: string;
    headline: string;
    summary?: string;
    shortSynopsis: string;
    masterBrand: string;
    episodeId: string;
    releaseDateTimeStamp: number;
    imageUrl: string;
    imageAltText: string;
    promoBrandTitle: string;
    durationISO8601: string;
    thumbnailImageUrl: string;
    radioScheduleData?: RadioScheduleData[];
    recentEpisodes: [];
    brandId: string;
    episodeTitle: string;
    externalLinks: string[];
    contentType: ContentType;
  };
  mediaIsAvailable?: boolean;
  MediaError: Component;
}

const OnDemandAudioPage = ({
  pageData,
  mediaIsAvailable,
  MediaError,
}: OnDemandAudioProps) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    isPodcast,
    language,
    brandTitle,
    headline,
    summary,
    shortSynopsis,
    masterBrand,
    releaseDateTimeStamp,
    imageUrl,
    imageAltText,
    promoBrandTitle,
    durationISO8601,
    thumbnailImageUrl,
    radioScheduleData,
    recentEpisodes,
    brandId,
    episodeTitle,
    externalLinks,
  } = pageData;

  const pageType = path(['metadata', 'type'], pageData);

  const { serviceName } = use(ServiceContext);

  const hasRecentEpisodes = recentEpisodes && Boolean(recentEpisodes.length);
  const metadataTitle = episodeTitle
    ? `${episodeTitle} - ${brandTitle} - ${serviceName}`
    : headline;

  const metadataImageProps = is(String, imageUrl)
    ? {
        image: `https://${imageUrl.replace('$recipe', `400x400`)}`,
        imageWidth: 400,
        imageHeight: 400,
      }
    : {};

  return (
    <>
      <ATIAnalytics atiData={pageData?.metadata.atiAnalytics} />
      <ChartbeatAnalytics
        mediaPageType={isPodcast ? 'Podcasts' : 'Radio'}
        title={headline}
        contentType={
          pageData?.metadata.atiAnalytics?.contentType as ContentType
        }
      />
      <ComscoreAnalytics />
      <MetadataContainer
        openGraphType="website"
        lang={language}
        title={metadataTitle}
        description={shortSynopsis}
        {...metadataImageProps}
        hasAmpPage={false}
      />
      <div css={styles.grid}>
        <div css={styles.contentWrapper}>
          <main role="main">
            <div css={styles.flexWrapper}>
              <div css={styles.text}>
                <StyledRadioHeadingContainer
                  idAttr={idAttr}
                  brandTitle={brandTitle}
                  episodeTitle={episodeTitle}
                  releaseDateTimeStamp={releaseDateTimeStamp}
                />
                <OnDemandParagraphContainer testid="summary" text={summary} />
                {episodeTitle && (
                  <FooterTimestamp
                    releaseDateTimeStamp={releaseDateTimeStamp}
                  />
                )}
              </div>
              <EpisodeImage
                imageUrl={imageUrl}
                alt={imageAltText}
                css={styles.image}
                className="imageStyles"
              />
            </div>
            {mediaIsAvailable ? (
              <MediaLoader blocks={pageData?.mediaBlocks} />
            ) : (
              //  @ts-expect-error allow rendering of MediaError component when media is not available
              <MediaError skin="audio" />
            )}

            <LinkedData
              type="WebPage"
              seoTitle={metadataTitle}
              entities={
                mediaIsAvailable
                  ? [
                      {
                        '@type': 'AudioObject',
                        name: promoBrandTitle,
                        description: shortSynopsis,
                        thumbnailUrl: thumbnailImageUrl,
                        duration: durationISO8601,
                        uploadDate: new Date(
                          releaseDateTimeStamp,
                        ).toISOString(),
                      },
                    ]
                  : []
              }
            />
          </main>

          {isPodcast && (
            <div css={styles.aside}>
              <PodcastExternalLinks
                links={externalLinks}
                brandTitle={brandTitle}
              />
            </div>
          )}
          {hasRecentEpisodes && (
            <div css={styles.aside}>
              <RecentAudioEpisodes
                masterBrand={masterBrand}
                episodes={recentEpisodes}
                brandId={brandId}
                pageType={pageType}
              />
            </div>
          )}
        </div>
      </div>
      {radioScheduleData && (
        <RadioScheduleContainer
          initialData={radioScheduleData}
          toggleName="onDemandRadioSchedule"
          eventTrackingData={{ componentName: 'radio-schedule' }}
        />
      )}
    </>
  );
};

export default OnDemandAudioPage;
