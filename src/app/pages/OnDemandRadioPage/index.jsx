import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { string, number, shape } from 'prop-types';
import styled from 'styled-components';
import MetadataContainer from '../../containers/Metadata';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';
import HeadingBlock from '#containers/RadioPageBlocks/Blocks/Heading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';
import AudioPlayerBlock from '#containers/RadioPageBlocks/Blocks/AudioPlayer';

const SKIP_LINK_ANCHOR_ID = 'content';

const getTimeTicks = () => new Date().getTime() * 10000;

const getEpisodeAvailability = (from, until) => {
  const timeNow = getTimeTicks();
  if (timeNow > until) return 'is-expired';
  if (timeNow < from) return 'is-not-yet-available';
  return 'is-available';
};

const StyledGelPageGrid = styled(GelPageGrid)`
  flex-grow: 1;
`;

const renderEpisode = (
  episodeAvailableFrom,
  episodeAvailableUntil,
  masterBrand,
  episodeId,
  expiredContentMessage,
) => {
  const episodeAvailability = getEpisodeAvailability(
    episodeAvailableFrom,
    episodeAvailableUntil,
  );
  switch (episodeAvailability) {
    case 'is-available':
      return <AudioPlayerBlock externalId={masterBrand} id={episodeId} />;
    case 'is-expired':
      return <p>{expiredContentMessage}</p>;
    case 'is-not-available':
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
  const { dir, translations } = useContext(ServiceContext);
  const expiredContentMessage = pathOr(
    'This content is no longer available',
    ['media', 'contentExpired'],
    translations,
  );

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
            expiredContentMessage,
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
