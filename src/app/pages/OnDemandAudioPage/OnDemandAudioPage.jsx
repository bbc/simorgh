import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';
import { shape, string, number, bool, func } from 'prop-types';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
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
import getEmbedUrl from '#lib/utilities/getUrlHelpers/getEmbedUrl';
import RadioScheduleContainer from '#containers/RadioSchedule';
import RecentAudioEpisodes from '#containers/RecentAudioEpisodes';
import FooterTimestamp from '#app/containers/OnDemandFooterTimestamp';

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

const StyledGelWrapperGrid = styled(GelPageGrid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_TRPL};
  }
`;

const StyledGridItemParagraph = styled(Grid)`
  @media (min-width: 22.5rem) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(4, 1fr);
    grid-column-end: span 4;
  }
`;

const StyledGridItemImage = styled(Grid)`
  @media (min-width: 22.5rem) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-end: span 2;
  }
`;

const OnDemandAudioPage = ({ pageData, mediaIsAvailable, MediaError }) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    language,
    brandTitle,
    headline,
    summary,
    shortSynopsis,
    masterBrand,
    episodeId,
    releaseDateTimeStamp,
    imageUrl,
    promoBrandTitle,
    durationISO8601,
    thumbnailImageUrl,
    radioScheduleData,
    recentEpisodes,
    brandId,
    episodeTitle,
  } = pageData;

  const pageType = path(['metadata', 'type'], pageData);

  const { isAmp } = useContext(RequestContext);
  const location = useLocation();
  const {
    dir,
    liveRadioOverrides,
    lang,
    service,
    translations,
    serviceName,
  } = useContext(ServiceContext);
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

  const iframeTitle = pathOr(
    'Audio player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

  const hasRecentEpisodes = recentEpisodes && Boolean(recentEpisodes.length);
  const metadataTitle = episodeTitle
    ? `${episodeTitle} - ${brandTitle} - ${serviceName}`
    : headline;

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={metadataTitle}
        lang={language}
        description={shortSynopsis}
        openGraphType="website"
      />

      <GelPageGrid
        as="main"
        role="main"
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
      >
        <Grid
          item
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          columns={getGroups(6, 6, 6, 6, 6, 12)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <StyledGelWrapperGrid
            dir={oppDir}
            columns={getGroups(6, 6, 6, 6, 6, 6)}
            enableGelGutters
          >
            <StyledGridItemParagraph item columns={getGroups(6, 6, 4, 4, 4, 4)}>
              <StyledRadioHeadingContainer
                idAttr={idAttr}
                brandTitle={brandTitle}
                episodeTitle={episodeTitle}
                releaseDateTimeStamp={releaseDateTimeStamp}
              />
              <OnDemandParagraphContainer text={summary} />
              {episodeTitle && (
                <FooterTimestamp releaseDateTimeStamp={releaseDateTimeStamp} />
              )}
            </StyledGridItemParagraph>
            <StyledGridItemImage item columns={getGroups(0, 0, 2, 2, 2, 2)}>    
              <EpisodeImage imageUrl={imageUrl} />
            </StyledGridItemImage>
          </StyledGelWrapperGrid>
          {mediaIsAvailable ? (
            <AVPlayer
              assetId={episodeId}
              embedUrl={embedUrl}
              iframeTitle={iframeTitle}
              title="On-demand radio"
              type="audio"
              skin="audio"
              placeholderSrc={audioPlaceholderImageSrc}
            />
          ) : (
            <MediaError skin="audio" />
          )}

          <LinkedData
            type="WebPage"
            seoTitle={metadataTitle}
            entities={
              mediaIsAvailable
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
      </GelPageGrid>
      {hasRecentEpisodes && (
        <GelPageGrid columns={getGroups(6, 6, 6, 6, 8, 20)} enableGelGutters>
          <Grid
            item
            startOffset={getGroups(1, 1, 1, 1, 2, 5)}
            columns={getGroups(6, 6, 6, 6, 6, 12)}
            margins={getGroups(true, true, true, true, false, false)}
          >
            <RecentAudioEpisodes
              masterBrand={masterBrand}
              episodes={recentEpisodes}
              brandId={brandId}
              pageType={pageType}
            />
          </Grid>
        </GelPageGrid>
      )}
      {radioScheduleData && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

OnDemandAudioPage.propTypes = {
  MediaError: func.isRequired,
  mediaIsAvailable: bool.isRequired,
  pageData: shape({
    brandTitle: string,
    headline: string,
    summary: string,
    language: string,
    releaseDateTimeStamp: number,
    imageUrl: string,
    episodeTitle: string,
  }).isRequired,
};

export default OnDemandAudioPage;
