import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string, number } from 'prop-types';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ATIAnalytics from '../../containers/ATIAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '#containers/LinkedData';
import MetadataContainer from '../../containers/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import OnDemandHeadingBlock from '#containers/RadioPageBlocks/Blocks/OnDemandHeading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';
import VideoPlayer from './VideoPlayer';

const SKIP_LINK_ANCHOR_ID = 'content';
const EPISODE_IS_AVAILABLE = 'available';
const EPISODE_IS_EXPIRED = 'expired';
const EPISODE_IS_NOT_YET_AVAILABLE = 'not-yet-available';

const StyledGelWrapperGrid = styled.div`
  padding-top: ${GEL_SPACING_TRPL};
`;

const getISOStringDate = date => new Date(date).toISOString();

const getGroups = (zero, one, two, three, four, five) => ({
  group0: zero,
  group1: one,
  group2: two,
  group3: three,
  group4: four,
  group5: five,
});

const getEpisodeAvailability = (availableFrom, availableUntil) => {
  const timeNow = Date.now();

  if (!availableUntil) return EPISODE_IS_EXPIRED;
  if (timeNow < availableFrom) return EPISODE_IS_NOT_YET_AVAILABLE;

  return EPISODE_IS_AVAILABLE;
};

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
`;

/* eslint-disable react/prop-types */
const renderEpisode = ({
  masterBrand,
  episodeId,
  episodeAvailableFrom,
  episodeAvailableUntil,
  imageUrl,
  promoBrandTitle,
  shortSynopsis,
  durationISO8601,
  thumbnailImageUrl,
  releaseDateTimeStamp,
}) => {
  const episodeAvailability = getEpisodeAvailability(
    episodeAvailableFrom,
    episodeAvailableUntil,
  );
  switch (episodeAvailability) {
    case EPISODE_IS_AVAILABLE:
      return (
        <VideoPlayer
          masterBrand={masterBrand}
          assetId={episodeId}
          imageUrl={imageUrl}
          shortSynopsis={shortSynopsis}
          durationISO8601={durationISO8601}
          thumbnailImageUrl={thumbnailImageUrl}
          releaseDateTimeStamp={releaseDateTimeStamp}
          promoBrandTitle={promoBrandTitle}
        />
      );
    case EPISODE_IS_EXPIRED:
      return <VideoPlayer isExpired />;
    case EPISODE_IS_NOT_YET_AVAILABLE:
    default:
      return null;
  }
};
/* eslint-enable react/prop-types */

const OnDemandTvPage = ({ pageData }) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    language,
    headline,
    shortSynopsis,
    brandTitle,
    episodeAvailableFrom,
    episodeAvailableUntil,
    releaseDateTimeStamp,
    firstPublished,
    lastPublished,
    masterBrand,
    episodeId,
    imageUrl,
  } = pageData;

  const { dir } = useContext(ServiceContext);

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
        // Do we need showAuthor here?
        // Check OD radio type value once PRd
        type="TVEpisode"
        datePublished={getISOStringDate(firstPublished)}
        dateModified={getISOStringDate(lastPublished)}
        seoTitle={headline}
        headline={headline}
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
          <StyledGelWrapperGrid
            columns={getGroups(6, 6, 6, 6, 6, 6)}
            enableGelGutters
          >
            {renderEpisode({
              masterBrand,
              episodeId,
              episodeAvailableFrom,
              episodeAvailableUntil,
              imageUrl,
            })}
          </StyledGelWrapperGrid>
          <OnDemandHeadingBlock
            idAttr={idAttr}
            brandTitle={brandTitle}
            releaseDateTimeStamp={releaseDateTimeStamp}
          />
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
    promoBrandTitle: string,
  }).isRequired,
};

export default OnDemandTvPage;
