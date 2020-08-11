import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { shape, string, number, bool, node } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import ATIAnalytics from '../../containers/ATIAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '#containers/LinkedData';
import MetadataContainer from '../../containers/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import StyledTvHeadingContainer from '#containers/OnDemandHeading/StyledTvHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import getPlaceholderImageUrl from '../../routes/utils/getPlaceholderImageUrl';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';
import DarkModeGlobalStyles from '#lib/utilities/darkMode';
import AVPlayer from '#containers/AVPlayer';
import useToggle from '#hooks/useToggle';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';

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
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
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

const OnDemandTvPage = ({ pageData, MediaError, mediaIsAvailable }) => {
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
  } = pageData;

  const {
    lang,
    timezone,
    datetimeLocale,
    dir,
    service,
    translations,
  } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);
  const location = useLocation();
  const darkMode = useToggle('cinemaModeTV').enabled;

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

  return (
    <>
      {darkMode && <DarkModeGlobalStyles />}
      <ChartbeatAnalytics data={pageData} />
      <ATIAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={headline}
        lang={language}
        description={shortSynopsis}
        openGraphType="website"
      />
      <LinkedData
        type="WebPage"
        seoTitle={headline}
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
                  embedURL: embedUrl,
                },
              ]
            : []
        }
      />
      <StyledGelPageGrid
        forwardedAs="main"
        role="main"
        dir={dir}
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
      >
        <Grid
          item
          dir={dir}
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
            />
          ) : (
            <MediaError skin="video" />
          )}

          <StyledTvHeadingContainer
            brandTitle={brandTitle}
            releaseDateTimeStamp={releaseDateTimeStamp}
            darkMode={darkMode}
            ariaHidden
          />
        </Grid>
        <Grid
          item
          dir={dir}
          columns={getGroups(6, 6, 6, 6, 5, 10)}
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <OnDemandParagraphContainer
            text={shortSynopsis}
            darkMode={darkMode}
          />
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandTvPage.propTypes = {
  mediaIsAvailable: bool,
  mediaError: node,
  pageData: shape({
    language: string,
    headline: string,
    shortSynopsis: string,
    brandTitle: string,
    releaseDateTimeStamp: number,
    masterBrand: string,
    episodeId: string,
    imageUrl: string,
    promoBrandTitle: string,
    thumbnailImageUrl: string,
    durationISO8601: string,
  }).isRequired,
};

export default withMediaError(OnDemandTvPage);
