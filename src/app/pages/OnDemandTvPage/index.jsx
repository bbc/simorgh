import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { shape, string, number, bool } from 'prop-types';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import pathOr from 'ramda/src/pathOr';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import { MediaMessage } from '@bbc/psammead-media-player';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ATIAnalytics from '../../containers/ATIAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '#containers/LinkedData';
import MetadataContainer from '../../containers/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import OnDemandHeadingBlock from '#containers/RadioPageBlocks/Blocks/OnDemandHeading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';
import VideoPlayer from './VideoPlayer';

const StyledGelWrapperGrid = styled.div`
  padding-top: ${GEL_SPACING_TRPL};
`;

const landscapeRatio = '56.25%'; // (9/16)*100 = 16:9
const StyledMessageContainer = styled.div`
  margin-top: ${GEL_SPACING_TRPL};
  padding-top: ${landscapeRatio};
  position: relative;
  overflow: hidden;
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    width: calc(100% + ${GEL_SPACING_QUAD});
    margin: 0 -${GEL_SPACING_DBL};
  }
`;

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

const StyledVideoPlayer = styled(VideoPlayer)`
  margin-top: ${GEL_SPACING_TRPL};
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    width: calc(100% + ${GEL_SPACING_QUAD});
    margin: 0 -${GEL_SPACING_DBL};
  }
`;

const OnDemandTvPage = ({ pageData }) => {
  const {
    language,
    headline,
    shortSynopsis,
    brandTitle,
    releaseDateTimeStamp,
    masterBrand,
    episodeId,
    imageUrl,
    episodeIsAvailable,
    promoBrandTitle,
    thumbnailImageUrl,
    durationISO8601,
  } = pageData;

  const { lang, timezone, locale, dir, service, translations } = useContext(
    ServiceContext,
  );
  const { isAmp } = useContext(RequestContext);
  const location = useLocation();

  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  const mediaId = `${service}/${masterBrand}/${episodeId}/${lang}`;

  const embedUrl = getEmbedUrl({
    mediaId,
    type: 'media',
    isAmp,
    queryString: location.search,
  });

  const expiredContentMessage = pathOr(
    'This content is no longer available',
    ['media', 'contentExpired'],
    translations,
  );
  const iframeTitle = pathOr(
    'Video player',
    ['mediaAssetPage', 'videoPlayer'],
    translations,
  );

  const type = 'video';
  const title = 'On-demand TV';

  return (
    <>
      <ChartbeatAnalytics data={pageData} />
      <ATIAnalytics data={pageData} />
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
          episodeIsAvailable
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
          margins={getGroups(true, true, true, true, true, false)}
        >
          <VisuallyHiddenText as="h1" tabIndex="-1" id="content">
            {brandTitle}, {formattedTimestamp}
          </VisuallyHiddenText>
          <StyledGelWrapperGrid
            columns={getGroups(6, 6, 6, 6, 6, 6)}
            enableGelGutters
          >
            {episodeIsAvailable ? (
              <StyledVideoPlayer
                embedUrl={embedUrl}
                assetId={episodeId}
                imageUrl={imageUrl}
                type={type}
                title={title}
                iframeTitle={iframeTitle}
              />
            ) : (
              <StyledMessageContainer>
                <MediaMessage
                  service={service}
                  message={expiredContentMessage}
                />
              </StyledMessageContainer>
            )}
          </StyledGelWrapperGrid>
          <OnDemandHeadingBlock
            brandTitle={brandTitle}
            releaseDateTimeStamp={releaseDateTimeStamp}
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
          <ParagraphBlock text={shortSynopsis} />
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandTvPage.propTypes = {
  pageData: shape({
    language: string,
    headline: string,
    shortSynopsis: string,
    brandTitle: string,
    releaseDateTimeStamp: number,
    masterBrand: string,
    episodeId: string,
    imageUrl: string,
    episodeIsAvailable: bool,
    promoBrandTitle: string,
    thumbnailImageUrl: string,
    durationISO8601: string,
  }).isRequired,
};

export default OnDemandTvPage;
