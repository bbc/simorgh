import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string, number, oneOf } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { MediaMessage } from '@bbc/psammead-media-player';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { useLocation } from 'react-router-dom';
import pathOr from 'ramda/src/pathOr';
import MetadataContainer from '../../containers/Metadata';
import ATIAnalytics from '../../containers/ATIAnalytics';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import StyledRadioHeadingContainer from '#containers/OnDemandHeading/StyledRadioHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import AVPlayer from '#containers/AVPlayer';
import EpisodeImage from '#containers/OnDemandImage';
import LinkedData from '#containers/LinkedData';
import getMediaId from '#lib/utilities/getMediaId';
import getMasterbrand from '#lib/utilities/getMasterbrand';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';
import { EPISODE_STATUS } from '#lib/utilities/episodeAvailability';

const SKIP_LINK_ANCHOR_ID = 'content';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const audioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const getGroups = (zero, one, two, three, four, five) => ({
  group0: zero,
  group1: one,
  group2: two,
  group3: three,
  group4: four,
  group5: five,
});

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
`;

const StyledGelWrapperGrid = styled(GelPageGrid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_TRPL};
  }
`;

const StyledMessageContainer = styled.div`
  position: relative;
  min-height: 165px;
  margin-bottom: ${GEL_SPACING_QUAD};
`;

// iframe padding set to keep scrub bar and duration in view
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
    episodeAvailability,
    releaseDateTimeStamp,
    imageUrl,
    promoBrandTitle,
    durationISO8601,
    thumbnailImageUrl,
  } = pageData;

  const { isAmp } = useContext(RequestContext);
  const location = useLocation();
  const { dir, liveRadioOverrides, lang, service, translations } = useContext(
    ServiceContext,
  );
  const oppDir = dir === 'rtl' ? 'ltr' : 'rtl';

  const mediaId = getMediaId({
    assetId: episodeId,
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

  const episodeIsAvailable =
    episodeAvailability === EPISODE_STATUS.EPISODE_IS_AVAILABLE;

  const getEpisodeNotAvailableMessage = () => {
    if (episodeAvailability === EPISODE_STATUS.EPISODE_IS_EXPIRED) {
      return pathOr(
        'This content is no longer available',
        ['media', 'contentExpired'],
        translations,
      );
    }
    return pathOr(
      'This content is not yet available',
      ['media', 'contentNotYetAvailable'],
      translations,
    );
  };

  const iframeTitle = pathOr(
    'Audio player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
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
              <StyledRadioHeadingContainer
                idAttr={idAttr}
                brandTitle={brandTitle}
                releaseDateTimeStamp={releaseDateTimeStamp}
              />
              <OnDemandParagraphContainer text={summary} />
            </Grid>
            <Grid dir={dir} item columns={getGroups(0, 0, 2, 2, 2, 2)}>
              <EpisodeImage imageUrl={imageUrl} dir={dir} />
            </Grid>
          </StyledGelWrapperGrid>
          {episodeIsAvailable ? (
            <StyledAudioPlayer
              assetId={episodeId}
              embedUrl={embedUrl}
              iframeTitle={iframeTitle}
              title="On-demand radio"
              type="audio"
              skin="audio"
              placeholderSrc={audioPlaceholderImageSrc}
            />
          ) : (
            <StyledMessageContainer>
              <MediaMessage
                service={service}
                message={getEpisodeNotAvailableMessage()}
              />
            </StyledMessageContainer>
          )}

          <LinkedData
            type="WebPage"
            seoTitle={headline}
            entities={
              episodeIsAvailable
                ? [
                    {
                      '@type': 'AudioObject',
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
    episodeAvailability: oneOf(Object.values(EPISODE_STATUS)),
    releaseDateTimeStamp: number,
    imageUrl: string,
  }).isRequired,
};

export default OnDemandRadioPage;
