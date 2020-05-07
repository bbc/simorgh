import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string, number } from 'prop-types';
import MetadataContainer from '../../containers/Metadata';
import ATIAnalytics from '../../containers/ATIAnalytics';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';
import HeadingBlock from '#containers/RadioPageBlocks/Blocks/Heading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';
import DatestampBlock from '#containers/RadioPageBlocks/Blocks/Datestamp';
import AudioPlayerBlock from '#containers/RadioPageBlocks/Blocks/AudioPlayer';

const SKIP_LINK_ANCHOR_ID = 'content';
const EPISODE_IS_AVAILABLE = 'available';
const EPISODE_IS_EXPIRED = 'expired';
const EPISODE_IS_NOT_YET_AVAILABLE = 'not-yet-available';

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
  promoBrandTitle,
  shortSynopsis,
  imageUrl,
  durationISO8601,
}) => {
  const episodeAvailability = getEpisodeAvailability(
    episodeAvailableFrom,
    episodeAvailableUntil,
  );
  switch (episodeAvailability) {
    case EPISODE_IS_AVAILABLE:
      return (
        <AudioPlayerBlock
          externalId={masterBrand}
          id={episodeId}
          promoBrandTitle={promoBrandTitle}
          shortSynopsis={shortSynopsis}
          imageUrl={imageUrl}
          durationISO8601={durationISO8601}
          episodeAvailableFrom={episodeAvailableFrom}
        />
      );
    case EPISODE_IS_EXPIRED:
      return <AudioPlayerBlock isExpired />;
    case EPISODE_IS_NOT_YET_AVAILABLE:
    default:
      return null;
  }
};
/* eslint-enable react/prop-types */

const OnDemandRadioPage = ({ pageData }) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    language,
    brandTitle,
    headline,
    summary,
    shortSynopsis,
    masterBrand,
    episodeId,
    episodeAvailableFrom,
    episodeAvailableUntil,
    releaseDateTimeStamp,
    promoBrandTitle,
    durationISO8601,
    imageUrl,
  } = pageData;
  const { dir } = useContext(ServiceContext);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={headline}
        lang={language}
        description={shortSynopsis}
        openGraphType="website"
      />

      <StyledGelPageGrid
        forwardedAs="main"
        role="main"
        dir={dir}
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        enableGelGutters
      >
        <Grid
          item
          dir={dir}
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 2,
            group5: 5,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
          margins={{ group0: true, group1: true, group2: true, group3: true }}
        >
          <HeadingBlock idAttr={idAttr} text={brandTitle} />
          <DatestampBlock timestamp={releaseDateTimeStamp} />
          <ParagraphBlock text={summary} />
          {renderEpisode({
            masterBrand,
            episodeId,
            episodeAvailableFrom,
            episodeAvailableUntil,
            promoBrandTitle,
            shortSynopsis,
            imageUrl,
            durationISO8601,
          })}
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandRadioPage.propTypes = {
  pageData: shape({
    brandTitle: string,
    headline: string,
    summary: string,
    language: string,
    episodeAvailableFrom: number,
    episodeAvailableUntil: number,
    releaseDateTimeStamp: number,
  }).isRequired,
};

export default OnDemandRadioPage;
