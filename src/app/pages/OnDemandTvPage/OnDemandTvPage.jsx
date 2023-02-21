import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { shape, string, number, bool, func } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import LinkedData from '#containers/LinkedData';
import { RequestContext } from '#contexts/RequestContext';
import StyledTvHeadingContainer from '#containers/OnDemandHeading/StyledTvHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import getEmbedUrl, {
  makeAbsolute,
} from '#lib/utilities/getUrlHelpers/getEmbedUrl';
import AVPlayer from '#containers/AVPlayer';
import RecentVideoEpisodes from '#containers/EpisodeList/RecentVideoEpisodes';
import FooterTimestamp from '#containers/OnDemandFooterTimestamp';
import MetadataContainer from '#containers/Metadata';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import { ServiceContext } from '../../contexts/ServiceContext';
import getPlaceholderImageUrl from '../../routes/utils/getPlaceholderImageUrl';

const getGroups = (zero, one, two, three, four, five) => ({
  group0: zero,
  group1: one,
  group2: two,
  group3: three,
  group4: four,
  group5: five,
});

const StyledGelPageGrid = styled(GelPageGrid)`
  padding-bottom: ${GEL_SPACING_QUAD};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: 100%;
  }
`;

const StyledVideoPlayer = styled(AVPlayer)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUIN} 0 0;
  }
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    margin: ${GEL_SPACING_DBL} -${GEL_SPACING_DBL} 0;
  }
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    margin: ${GEL_SPACING} -${GEL_SPACING} 0;
  }
`;

const OnDemandTvPage = ({ pageData, mediaIsAvailable, MediaError }) => {
  const {
    language,
    headline,
    shortSynopsis,
    brandTitle,
    releaseDateTimeStamp,
    masterBrand,
    episodeId,
    imageUrl,
    promoBrandTitle,
    thumbnailImageUrl,
    durationISO8601,
    recentEpisodes,
    episodeTitle,
    mediumSynopsis,
  } = pageData;

  const { lang, timezone, datetimeLocale, service, translations, brandName } =
    useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);
  const location = useLocation();

  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale: datetimeLocale,
    isRelative: false,
  });

  const mediaId = `${service}/${masterBrand}/${episodeId}/${lang}`;

  const embedUrl = getEmbedUrl({
    mediaId,
    type: 'media',
    isAmp,
    queryString: location.search,
  });

  const iframeTitle = pathOr(
    'Video player',
    ['mediaAssetPage', 'videoPlayer'],
    translations,
  );

  const hasRecentEpisodes = recentEpisodes && Boolean(recentEpisodes.length);
  const metadataTitle = episodeTitle
    ? `${brandTitle} - ${episodeTitle} - ${brandName}`
    : headline;

  return (
    <>
      <ChartbeatAnalytics data={pageData} />
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
                  embedURL: makeAbsolute(embedUrl),
                },
              ]
            : []
        }
      />
      <StyledGelPageGrid
        as="main"
        role="main"
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
      >
        <Grid
          item
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          columns={getGroups(6, 6, 6, 6, 6, 12)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <VisuallyHiddenText as="h1" tabIndex="-1" id="content">
            {/* these must be concatenated for screen reader UX - #7062 */}
            {`${brandTitle}, ${formattedTimestamp}`}
          </VisuallyHiddenText>
          {mediaIsAvailable ? (
            <StyledVideoPlayer
              embedUrl={embedUrl}
              assetId={episodeId}
              placeholderSrc={getPlaceholderImageUrl(imageUrl)}
              type="video"
              title="On-demand TV"
              iframeTitle={iframeTitle}
              hasBottomPadding={false}
              skin="classic"
              showLoadingImage
              darkMode
            />
          ) : (
            <MediaError skin="video" />
          )}

          <StyledTvHeadingContainer
            brandTitle={brandTitle}
            releaseDateTimeStamp={releaseDateTimeStamp}
            episodeTitle={episodeTitle}
            darkMode
            ariaHidden
          />
        </Grid>
        <Grid
          item
          columns={getGroups(6, 6, 6, 6, 5, 10)}
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <OnDemandParagraphContainer
            text={episodeTitle ? mediumSynopsis : shortSynopsis}
            darkMode
          />
          {episodeTitle && (
            <FooterTimestamp
              releaseDateTimeStamp={releaseDateTimeStamp}
              darkMode
            />
          )}
        </Grid>
      </StyledGelPageGrid>

      {hasRecentEpisodes && (
        <StyledGelPageGrid
          columns={getGroups(6, 6, 6, 6, 8, 20)}
          enableGelGutters
        >
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
        </StyledGelPageGrid>
      )}
    </>
  );
};

OnDemandTvPage.propTypes = {
  MediaError: func.isRequired,
  mediaIsAvailable: bool.isRequired,
  pageData: shape({
    language: string,
    headline: string,
    shortSynopsis: string,
    mediumSynopsis: string,
    brandTitle: string,
    releaseDateTimeStamp: number,
    masterBrand: string,
    episodeId: string,
    imageUrl: string,
    promoBrandTitle: string,
    thumbnailImageUrl: string,
    durationISO8601: string,
    episodeTitle: string,
  }).isRequired,
};

export default OnDemandTvPage;
