import React, { useContext } from 'react';
import path from 'ramda/src/path';
import is from 'ramda/src/is';
import styled from '@emotion/styled';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import pathOr from 'ramda/src/pathOr';
import useLocation from '#hooks/useLocation';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#legacy/components/Grid';
import StyledRadioHeadingContainer from '#containers/OnDemandHeading/StyledRadioHeadingContainer';
import OnDemandParagraphContainer from '#containers/OnDemandParagraph';
import AVPlayer from '#containers/AVPlayer';
import EpisodeImage from '#containers/OnDemandImage';
import getMediaId from '#lib/utilities/getMediaId';
import getMasterbrand from '#lib/utilities/getMasterbrand';
import getEmbedUrl, {
  makeAbsolute,
} from '#lib/utilities/getUrlHelpers/getEmbedUrl';
import RadioScheduleContainer from '#containers/RadioSchedule';
import RecentAudioEpisodes from '#containers/EpisodeList/RecentAudioEpisodes';
import FooterTimestamp from '#containers/OnDemandFooterTimestamp';
import PodcastExternalLinks from '#containers/PodcastExternalLinks';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import ATIAnalytics from '#components/ATIAnalytics';
import ChartbeatAnalytics from '#components/ChartbeatAnalytics';
import MetadataContainer from '#components/Metadata';
import LinkedData from '#components/LinkedData';
import { ServiceContext } from '#contexts/ServiceContext';

const SKIP_LINK_ANCHOR_ID = 'content';

const staticAssetsPath = `${
  getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN
}${getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

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

const PageGrid = ({ children }) => (
  <GelPageGrid columns={getGroups(6, 6, 6, 6, 8, 20)} enableGelGutters>
    <Grid
      item
      startOffset={getGroups(1, 1, 1, 1, 2, 5)}
      columns={getGroups(6, 6, 6, 6, 6, 12)}
      margins={getGroups(true, true, true, true, false, false)}
    >
      {children}
    </Grid>
  </GelPageGrid>
);

const OnDemandAudioPage = ({ pageData, mediaIsAvailable, MediaError }) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    isPodcast,
    language,
    brandTitle,
    headline,
    summary,
    shortSynopsis,
    masterBrand,
    episodeId,
    releaseDateTimeStamp,
    imageUrl,
    imageAltText,
    promoBrandTitle,
    durationISO8601,
    thumbnailImageUrl,
    radioScheduleData,
    recentEpisodes,
    brandId,
    episodeTitle,
    externalLinks,
  } = pageData;

  const pageType = path(['metadata', 'type'], pageData);

  const location = useLocation();
  const { dir, liveRadioOverrides, lang, service, translations, serviceName } =
    useContext(ServiceContext);
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

  const metadataImageProps = is(String, imageUrl)
    ? {
        image: `https://${imageUrl.replace('$recipe', `400x400`)}`,
        imageWidth: 400,
        imageHeight: 400,
      }
    : {};

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics
        mediaPageType={isPodcast ? 'Podcasts' : 'Radio'}
        title={headline}
        contentType={pageData?.contentType}
      />
      <ComscoreAnalytics />
      <MetadataContainer
        openGraphType="website"
        lang={language}
        title={metadataTitle}
        description={shortSynopsis}
        {...metadataImageProps}
        hasAmpPage={false}
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
            <StyledGridItemParagraph
              item
              columns={getGroups(6, 6, 4, 4, 4, 4)}
              parentColumns={getGroups(6, 6, 6, 6, 6, 6)}
              parentEnableGelGutters
            >
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
            <StyledGridItemImage
              item
              columns={getGroups(0, 0, 2, 2, 2, 2)}
              parentColumns={getGroups(6, 6, 6, 6, 6, 6)}
              parentEnableGelGutters
            >
              <EpisodeImage imageUrl={imageUrl} alt={imageAltText} />
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
                      embedURL: makeAbsolute(embedUrl),
                    },
                  ]
                : []
            }
          />
        </Grid>
      </GelPageGrid>
      {isPodcast && (
        <PageGrid>
          <PodcastExternalLinks links={externalLinks} brandTitle={brandTitle} />
        </PageGrid>
      )}
      {hasRecentEpisodes && (
        <PageGrid>
          <RecentAudioEpisodes
            masterBrand={masterBrand}
            episodes={recentEpisodes}
            brandId={brandId}
            pageType={pageType}
          />
        </PageGrid>
      )}
      {radioScheduleData && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

export default OnDemandAudioPage;
