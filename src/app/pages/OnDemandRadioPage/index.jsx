import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string, number } from 'prop-types';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import MetadataContainer from '../../containers/Metadata';
import ATIAnalytics from '../../containers/ATIAnalytics';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';
import OnDemandHeadingBlock from '#containers/RadioPageBlocks/Blocks/OnDemandHeading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';
import AudioPlayerBlock from '#containers/RadioPageBlocks/Blocks/AudioPlayer';
import EpisodeImage from '#containers/RadioPageBlocks/Blocks/OnDemandImage';

const SKIP_LINK_ANCHOR_ID = 'content';
const EPISODE_IS_AVAILABLE = 'available';
const EPISODE_IS_EXPIRED = 'expired';
const EPISODE_IS_NOT_YET_AVAILABLE = 'not-yet-available';

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

const StyledGelWrapperGrid = styled(GelPageGrid)`
  padding-top: ${GEL_SPACING_TRPL};
`;

/* eslint-disable react/prop-types */
const renderEpisode = ({
  masterBrand,
  episodeId,
  episodeAvailableFrom,
  episodeAvailableUntil,
  promoBrandTitle,
  shortSynopsis,
  thumbnailImageUrl,
  durationISO8601,
  releaseDateTimeStamp,
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
          thumbnailImageUrl={thumbnailImageUrl}
          durationISO8601={durationISO8601}
          releaseDateTimeStamp={releaseDateTimeStamp}
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
    imageUrl,
    promoBrandTitle,
    durationISO8601,
    thumbnailImageUrl,
  } = pageData;

  const { dir } = useContext(ServiceContext);
  const oppDir = dir === 'rtl' ? 'ltr' : 'rtl';

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
            dir={oppDir}
            columns={getGroups(6, 6, 6, 6, 6, 6)}
            enableGelGutters
          >
            <Grid dir={dir} item columns={getGroups(6, 6, 4, 4, 4, 4)}>
              <OnDemandHeadingBlock
                idAttr={idAttr}
                brandTitle={brandTitle}
                releaseDateTimeStamp={releaseDateTimeStamp}
              />
              <ParagraphBlock text={summary} />
            </Grid>
            <Grid dir={dir} item columns={getGroups(0, 0, 2, 2, 2, 2)}>
              <EpisodeImage imageUrl={imageUrl} dir={dir} />
            </Grid>
          </StyledGelWrapperGrid>
          {renderEpisode({
            masterBrand,
            episodeId,
            episodeAvailableFrom,
            episodeAvailableUntil,
            promoBrandTitle,
            shortSynopsis,
            thumbnailImageUrl,
            durationISO8601,
            releaseDateTimeStamp,
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
    imageUrl: string,
  }).isRequired,
};

export default OnDemandRadioPage;
