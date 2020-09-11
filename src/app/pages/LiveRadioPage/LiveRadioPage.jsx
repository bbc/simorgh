import React, { useContext, useEffect } from 'react';
import { string, shape } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import Paragraph from '@bbc/psammead-paragraph';
import ATIAnalytics from '../../containers/ATIAnalytics';
import MetadataContainer from '../../containers/Metadata';
import RadioScheduleContainer from '#containers/RadioSchedule';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '../../containers/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';
import { MediaPlayerContext } from '../../contexts/MediaPlayerContext';
import {
  BigRedPlayingButton,
  BigRedPlayButton,
  BigLoadingButton,
} from './BigRedButton';
import useLiveRadioSettings from './useLiveRadioSettings';

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
`;

export const BigRedButton = styled.button`
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: ${({ disabled }) => (disabled ? 'black' : C_POSTBOX)};
  cursor: pointer;
  margin-bottom: 36px;
`;

const LiveRadioPage = ({ pageData }) => {
  const {
    language,
    name,
    summary,
    heading,
    bodySummary,
    masterBrand,
    radioScheduleData,
  } = pageData;
  const { script, service, dir } = useContext(ServiceContext);

  const {
    toggleMediaPlayer,
    initialiseMediaPlayer,
    playerIsInitialised,
    isPlayerReady,
    isPlaying,
  } = useContext(MediaPlayerContext);
  const {
    assetId,
    embedUrl,
    iframeTitle,
    placeholderSrc,
  } = useLiveRadioSettings(masterBrand);

  const hasRadioScheduleData = Boolean(radioScheduleData);

  useEffect(() => {
    if (!playerIsInitialised) {
      initialiseMediaPlayer({
        assetId,
        embedUrl,
        iframeTitle,
        title: 'Live radio',
        type: 'audio',
        skin: 'audio',
        placeholderSrc,
        heading,
        summary: bodySummary,
      });
    }
  }, []);

  // eslint-disable-next-line no-nested-ternary
  const bigRedButtonState = isPlayerReady
    ? isPlaying
      ? 'playing'
      : 'ready'
    : 'loading';

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={name}
        lang={language}
        description={summary}
        openGraphType="website"
      />
      <LinkedData type="RadioChannel" seoTitle={name} />

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
          <Headline
            script={script}
            service={service}
            id="content"
            tabIndex="-1"
          >
            {heading}
          </Headline>
          <Paragraph script={script} service={service}>
            {bodySummary}
          </Paragraph>
          {bigRedButtonState === 'loading' && (
            <BigRedButton disabled>
              <BigLoadingButton />
            </BigRedButton>
          )}
          {bigRedButtonState === 'playing' && (
            <BigRedButton onClick={toggleMediaPlayer}>
              <BigRedPlayingButton />
            </BigRedButton>
          )}
          {bigRedButtonState === 'ready' && (
            <BigRedButton onClick={toggleMediaPlayer}>
              <BigRedPlayButton />
            </BigRedButton>
          )}
        </Grid>
      </StyledGelPageGrid>
      {hasRadioScheduleData && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

LiveRadioPage.propTypes = {
  pageData: shape({
    metadata: shape({
      type: string,
    }),
    language: string,
    name: string,
    summary: string,
    heading: string,
    bodySummary: string,
    masterBrand: string,
  }).isRequired,
};

export default LiveRadioPage;
