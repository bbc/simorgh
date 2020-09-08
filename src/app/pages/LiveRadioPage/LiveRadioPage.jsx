import React, { useContext, useEffect } from 'react';
import { string, shape } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import pathOr from 'ramda/src/pathOr';
import Paragraph from '@bbc/psammead-paragraph';
import { useLocation, Link } from 'react-router-dom';
import ATIAnalytics from '../../containers/ATIAnalytics';
import MetadataContainer from '../../containers/Metadata';
import RadioScheduleContainer from '#containers/RadioSchedule';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '../../containers/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';
import { MediaPlayerContext } from '../../contexts/MediaPlayerContext';
import { RequestContext } from '#contexts/RequestContext';
import getMediaId from '#lib/utilities/getMediaId';
import getMasterbrand from '#lib/utilities/getMasterbrand';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const audioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const BigRedButton = styled.button`
  background: red;
  color: #fff;
`;

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
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
  const {
    script,
    service,
    dir,
    lang,
    liveRadioOverrides,
    translations,
  } = useContext(ServiceContext);

  const { isAmp } = useContext(RequestContext);
  const {
    toggleMediaPlayer,
    initialiseMediaPlayer,
    playerIsInitialised,
  } = useContext(MediaPlayerContext);
  const location = useLocation();
  const assetId = 'liveradio';
  const mediaId = getMediaId({
    assetId,
    masterBrand: getMasterbrand(masterBrand, liveRadioOverrides),
    lang,
    service,
  });
  const embedUrl = getEmbedUrl({
    mediaId,
    type: 'media',
    isAmp,
    queryString: location.search,
  });
  const iframeTitle = pathOr(
    'Audio player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

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
        placeholderSrc: audioPlaceholderImageSrc,
        heading,
        summary: bodySummary,
      });
    }
  }, []);

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
        </Grid>
        <Link to="/indonesia/media-23269037">Hello</Link>
        <BigRedButton onClick={toggleMediaPlayer}>Toggle Player</BigRedButton>
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
