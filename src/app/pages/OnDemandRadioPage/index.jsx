import React, { useContext } from 'react';
import { string, number, shape } from 'prop-types';
import styled from 'styled-components';
import MetadataContainer from '../../containers/Metadata';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';
import HeadingBlock from '#containers/RadioPageBlocks/Blocks/Heading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';
import AudioPlayerBlock from '#containers/RadioPageBlocks/Blocks/AudioPlayer';

const SKIP_LINK_ANCHOR_ID = 'content';
const EPISODE_IS_AVAILABLE = 'is-available';
const EPISODE_IS_EXPIRED = 'is-expired';
const EPISODE_IS_NOT_YET_AVAILABLE = 'is-not-yet-available';

const getTimeTicks = () => new Date().getTime() * 10000;

const getEpisodeAvailability = (from, until) => {
  const timeNow = getTimeTicks();
  if (timeNow > until) return EPISODE_IS_EXPIRED;
  if (timeNow < from) return EPISODE_IS_NOT_YET_AVAILABLE;
  return EPISODE_IS_AVAILABLE;
};

const StyledGelPageGrid = styled(GelPageGrid)`
  flex-grow: 1;
`;

const renderEpisode = (
  episodeAvailableFrom,
  episodeAvailableUntil,
  masterBrand,
  episodeId,
) => {
  const episodeAvailability = getEpisodeAvailability(
    episodeAvailableFrom,
    episodeAvailableUntil,
  );
  switch (episodeAvailability) {
    case EPISODE_IS_AVAILABLE:
      return <AudioPlayerBlock externalId={masterBrand} id={episodeId} />;
    case EPISODE_IS_EXPIRED:
      return (
        <AudioPlayerBlock isExpired externalId={masterBrand} id={episodeId} />
      );
    case EPISODE_IS_NOT_YET_AVAILABLE:
    default:
      return null;
  }
};

const OnDemandRadioPage = ({ pageData }) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    language,
    brandTitle,
    episodeTitle,
    headline,
    summary,
    shortSynopsis,
    masterBrand,
    episodeId,
    episodeAvailableFrom,
    episodeAvailableUntil,
  } = pageData;
  const { dir } = useContext(ServiceContext);

  return (
    <>
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
          <ParagraphBlock text={episodeTitle} />
          <ParagraphBlock text={summary} />
          {renderEpisode(
            episodeAvailableFrom,
            episodeAvailableUntil,
            masterBrand,
            episodeId,
          )}
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandRadioPage.propTypes = {
  pageData: shape({
    brandTitle: string,
    episodeTitle: string,
    headline: string,
    summary: string,
    language: string,
    episodeAvailableFrom: number,
    episodeAvailableUntil: number,
  }).isRequired,
};

export default OnDemandRadioPage;
