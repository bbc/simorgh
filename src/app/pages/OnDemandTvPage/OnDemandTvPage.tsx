/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import StyledTvHeadingContainer from '#containers/OnDemandHeading/StyledTvHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import RecentVideoEpisodes from '#containers/EpisodeList/RecentVideoEpisodes';
import FooterTimestamp from '#containers/OnDemandFooterTimestamp';
import { PageTypes } from '#app/models/types/global';
import { ContentType } from '#app/components/ChartbeatAnalytics/types';
import MediaLoader from '#app/components/MediaLoader';
import { OnDemandTVBlock, MediaOverrides } from '#app/models/types/media';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import LinkedData from '../../components/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';
import MetadataContainer from '../../components/Metadata';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';
import styles from './index.styles';

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

export interface OnDemandTVProps {
  pageData: {
    mediaBlocks: OnDemandTVBlock[];
    metadata: {
      type: PageTypes;
    };
    language: string;
    headline: string;
    shortSynopsis: string;
    brandTitle?: string;
    releaseDateTimeStamp: number;
    masterBrand?: string;
    episodeId: string;
    imageUrl: string;
    promoBrandTitle: string;
    thumbnailImageUrl: string;
    durationISO8601: string;
    recentEpisodes?: string[];
    episodeTitle: string;
    mediumSynopsis?: string;
    contentType: ContentType;
  };
  mediaIsAvailable?: boolean;
  MediaError: React.Component;
}

const OnDemandTvPage = ({
  pageData,
  mediaIsAvailable,
  MediaError,
}: OnDemandTVProps) => {
  const {
    language,
    headline,
    shortSynopsis,
    brandTitle,
    releaseDateTimeStamp,
    masterBrand,
    episodeId,
    promoBrandTitle,
    thumbnailImageUrl,
    durationISO8601,
    recentEpisodes,
    episodeTitle,
    mediumSynopsis,
    contentType,
  } = pageData;

  const { timezone, datetimeLocale, service, brandName } =
    useContext(ServiceContext);

  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale: datetimeLocale,
    isRelative: false,
  });

  const hasRecentEpisodes = recentEpisodes && Boolean(recentEpisodes.length);
  const metadataTitle = episodeTitle
    ? `${brandTitle} - ${episodeTitle} - ${brandName}`
    : headline;

  const mediaOverrides: MediaOverrides = {
    model: {
      language,
      pageIdentifierOverride: `${service}.bbc_${service}_tv.tv.${episodeId}.page`,
      pageTitleOverride: promoBrandTitle,
    },
    type: 'mediaOverrides',
  };

  const mediaBlocksWithOverrides = [...pageData?.mediaBlocks, mediaOverrides];

  return (
    <div css={styles.wrapper}>
      <ChartbeatAnalytics
        mediaPageType="TV"
        title={headline}
        contentType={contentType}
      />
      <ATIAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={metadataTitle}
        lang={language}
        description={shortSynopsis}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData
        type="WebPage"
        seoTitle={metadataTitle}
        entities={
          mediaIsAvailable
            ? [
                {
                  '@type': 'VideoObject',
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
      {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
      <GelPageGrid
        as="main"
        role="main"
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
        css={styles.pageGrid}
      >
        {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
        <Grid
          item
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          columns={getGroups(6, 6, 6, 6, 6, 12)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <VisuallyHiddenText as="h1" tabIndex={-1} id="content">
            {/* these must be concatenated for screen reader UX - #7062 */}
            {`${brandTitle}, ${formattedTimestamp}`}
          </VisuallyHiddenText>
          {mediaIsAvailable ? (
            <MediaLoader
              blocks={mediaBlocksWithOverrides}
              css={styles.mediaPlayer}
            />
          ) : (
            //  @ts-expect-error allow rendering of MediaError component when media is not available
            <MediaError skin="video" />
          )}

          <StyledTvHeadingContainer
            brandTitle={brandTitle}
            releaseDateTimeStamp={releaseDateTimeStamp}
            episodeTitle={episodeTitle}
            ariaHidden
          />
        </Grid>
        {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
        <Grid
          item
          columns={getGroups(6, 6, 6, 6, 5, 10)}
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <OnDemandParagraphContainer
            text={episodeTitle ? mediumSynopsis : shortSynopsis}
          />
          {episodeTitle && (
            <FooterTimestamp releaseDateTimeStamp={releaseDateTimeStamp} />
          )}
        </Grid>
      </GelPageGrid>

      {hasRecentEpisodes && (
        // @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags
        <GelPageGrid
          columns={getGroups(6, 6, 6, 6, 8, 20)}
          enableGelGutters
          css={styles.pageGrid}
        >
          {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
          <Grid
            item
            startOffset={getGroups(1, 1, 1, 1, 2, 5)}
            columns={getGroups(6, 6, 6, 6, 6, 12)}
            margins={getGroups(true, true, true, true, false, false)}
          >
            <RecentVideoEpisodes
              masterBrand={masterBrand}
              episodes={recentEpisodes}
            />
          </Grid>
        </GelPageGrid>
      )}
    </div>
  );
};

export default OnDemandTvPage;
