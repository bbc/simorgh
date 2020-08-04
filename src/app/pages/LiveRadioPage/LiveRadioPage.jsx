import React, { useContext } from 'react';
import { string, shape, object } from 'prop-types';
import styled from 'styled-components';
import path from 'ramda/src/path';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { Headline } from '@bbc/psammead-headings';
import pathOr from 'ramda/src/pathOr';
import Paragraph from '@bbc/psammead-paragraph';
import { useLocation } from 'react-router-dom';
import useToggle from '#hooks/useToggle';
import ATIAnalytics from '../../containers/ATIAnalytics';
import MetadataContainer from '../../containers/Metadata';
import RadioScheduleContainer from '#containers/RadioSchedule';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '../../containers/LinkedData';
import AVPlayer from '#containers/AVPlayer';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import getMediaId from '#lib/utilities/getMediaId';
import getMasterbrand from '#lib/utilities/getMasterbrand';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const audioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
`;

const StyledAudioPlayer = styled(AVPlayer)`
  amp-iframe {
    overflow: visible !important;
    width: calc(100% + ${GEL_SPACING_DBL});
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      width: calc(100% + ${GEL_SPACING_QUAD});
    }
  }
  iframe {
    width: calc(100% + ${GEL_SPACING_DBL});
    margin: 0 -${GEL_SPACING};
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      width: calc(100% + ${GEL_SPACING_QUAD});
      margin: 0 -${GEL_SPACING_DBL};
    }
  }
`;

const LiveRadioPage = ({ pageData }) => {
  const {
    language,
    name,
    summary,
    heading,
    bodySummary,
    masterBrand,
  } = pageData;
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const {
    script,
    service,
    dir,
    lang,
    liveRadioOverrides,
    translations,
    radioSchedule,
  } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);
  const location = useLocation();
  const assetId = 'liveradio';
  const mediaId = getMediaId({
    assetId,
    masterBrand: getMasterbrand(masterBrand, liveRadioOverrides),
    lang,
    service,
  });
  const radioScheduleOnPage = path(['onLiveRadioPage'], radioSchedule);
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

  const { enabled } = useToggle('liveRadioSchedule');
  // onLiveRadioPage is enabled on Persian to render the schedule for bbc_dari_radio
  // however bbc_persian_radio should not show the schedule
  const showSchedule =
    enabled && radioScheduleOnPage && masterBrand !== 'bbc_persian_radio';

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
          <StyledAudioPlayer
            assetId={assetId}
            embedUrl={embedUrl}
            iframeTitle={iframeTitle}
            title="Live radio"
            type="audio"
            skin="audio"
            placeholderSrc={audioPlaceholderImageSrc}
          />
        </Grid>
      </StyledGelPageGrid>
      {showSchedule && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

LiveRadioPage.propTypes = {
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
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
