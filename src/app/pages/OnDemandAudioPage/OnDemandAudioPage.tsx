import React, { useContext } from 'react';
import path from 'ramda/src/path';
import is from 'ramda/src/is';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import StyledRadioHeadingContainer from '#containers/OnDemandHeading/StyledRadioHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import EpisodeImage from '#containers/OnDemandImage';
import getMasterbrand from '#lib/utilities/getMasterbrand';
import RadioScheduleContainer from '#containers/RadioSchedule';
import RecentAudioEpisodes from '#containers/EpisodeList/RecentAudioEpisodes';
import FooterTimestamp from '#containers/OnDemandFooterTimestamp';
import PodcastExternalLinks from '#containers/PodcastExternalLinks';
import MediaLoader from '#app/components/MediaLoader';
import { PageTypes } from '#app/models/types/global';
import { RadioScheduleData } from '#app/models/types/radioSchedule';
import { ContentType } from '#app/components/ChartbeatAnalytics/types';
import { OnDemandAudioBlock, MediaOverrides } from '#app/models/types/media';
import styles from './index.styles';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';

const SKIP_LINK_ANCHOR_ID = 'content';

const getGroups = (
  zero: number | boolean,
  one: number | boolean,
  two: number | boolean,
  three: number | boolean,
  four: number | boolean,
  five: number | boolean,
) => ({
  group0: zero,
  group1: one,
  group2: two,
  group3: three,
  group4: four,
  group5: five,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PageGrid = ({ children }: any) => (
  // @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags
  <GelPageGrid columns={getGroups(6, 6, 6, 6, 8, 20)} enableGelGutters>
    {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
    <Grid
      item
      startOffset={getGroups(1, 1, 1, 1, 2, 5)}
      columns={getGroups(6, 6, 6, 6, 6, 12)}
      margins={getGroups(true, true, true, true, false, false)}
    >
      {children}
    </Grid>
  </GelPageGrid>
);

export interface OnDemandAudioProps {
  pageData: {
    mediaBlocks: OnDemandAudioBlock[];
    metadata: {
      type: PageTypes;
    };
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
  MediaError: React.Component;
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
    episodeId,
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

  const { dir, liveRadioOverrides, service, serviceName } =
    useContext(ServiceContext);
  const oppDir = dir === 'rtl' ? 'ltr' : 'rtl';

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

  const serviceMasterBrand = getMasterbrand(masterBrand, liveRadioOverrides);

  const pageIdentifierOverride = isPodcast
    ? `${service}.${serviceMasterBrand}.podcasts.${episodeId}.page`
    : `${service}.${serviceMasterBrand}.${episodeId}.page`;

  const mediaOverrides: MediaOverrides = {
    model: {
      language,
      pageIdentifierOverride,
      pageTitleOverride: promoBrandTitle,
    },
    type: 'mediaOverrides',
  };

  const mediaBlocksWithOverrides = [...pageData?.mediaBlocks, mediaOverrides];

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics
        mediaPageType={isPodcast ? 'Podcasts' : 'Radio'}
        title={headline}
        contentType={pageData?.contentType}
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
      {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
      <GelPageGrid
        as="main"
        role="main"
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
      >
        {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
        <Grid
          item
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          columns={getGroups(6, 6, 6, 6, 6, 12)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
          <GelPageGrid
            dir={oppDir}
            columns={getGroups(6, 6, 6, 6, 6, 6)}
            enableGelGutters
            css={styles.wrapper}
          >
            {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
            <Grid
              item
              columns={getGroups(6, 6, 4, 4, 4, 4)}
              parentColumns={getGroups(6, 6, 6, 6, 6, 6)}
              parentEnableGelGutters
              css={styles.paragraph}
            >
              <StyledRadioHeadingContainer
                // @ts-expect-error idAttr is a string
                idAttr={idAttr}
                brandTitle={brandTitle}
                episodeTitle={episodeTitle}
                releaseDateTimeStamp={releaseDateTimeStamp}
              />
              <OnDemandParagraphContainer text={summary} />
              {episodeTitle && (
                <FooterTimestamp releaseDateTimeStamp={releaseDateTimeStamp} />
              )}
            </Grid>
            {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
            <Grid
              item
              columns={getGroups(0, 0, 2, 2, 2, 2)}
              parentColumns={getGroups(6, 6, 6, 6, 6, 6)}
              parentEnableGelGutters
              css={styles.image}
            >
              <EpisodeImage imageUrl={imageUrl} alt={imageAltText} />
            </Grid>
          </GelPageGrid>
          {mediaIsAvailable ? (
            <MediaLoader blocks={mediaBlocksWithOverrides} />
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
                      uploadDate: new Date(releaseDateTimeStamp).toISOString(),
                    },
                  ]
                : []
            }
          />
        </Grid>
      </GelPageGrid>
      {isPodcast && (
        <PageGrid>
          <PodcastExternalLinks links={externalLinks} brandTitle={brandTitle} />
        </PageGrid>
      )}
      {hasRecentEpisodes && (
        <PageGrid>
          <RecentAudioEpisodes
            masterBrand={masterBrand}
            episodes={recentEpisodes}
            brandId={brandId}
            pageType={pageType}
          />
        </PageGrid>
      )}
      {radioScheduleData && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

export default OnDemandAudioPage;
