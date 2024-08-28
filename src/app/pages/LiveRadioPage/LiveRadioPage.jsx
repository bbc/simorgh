import React, { useContext } from 'react';
import { Headline } from '#psammead/psammead-headings/src';
import pathOr from 'ramda/src/pathOr';
import Paragraph from '#psammead/psammead-paragraph/src';
import RadioScheduleContainer from '#containers/RadioSchedule';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import useLocation from '#hooks/useLocation';
import AVPlayer from '#containers/AVPlayer';
import getMediaId from '#lib/utilities/getMediaId';
import getMasterbrand from '#lib/utilities/getMasterbrand';
import getEmbedUrl from '#lib/utilities/getUrlHelpers/getEmbedUrl';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '#contexts/ServiceContext';
import LinkedData from '../../components/LinkedData';

const staticAssetsPath = `${
  getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN
}${getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const audioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

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
  const { script, service, lang, liveRadioOverrides, translations } =
    useContext(ServiceContext);
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
    queryString: location.search,
  });
  const iframeTitle = pathOr(
    'Audio player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );
  const hasRadioScheduleData = Boolean(radioScheduleData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics
        mediaPageType="Radio"
        title={name}
        contentType={pageData?.contentType}
      />
      <ComscoreAnalytics />
      <MetadataContainer
        title={name}
        lang={language}
        description={summary}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData type="RadioChannel" seoTitle={name} />

      <GelPageGrid
        as="main"
        role="main"
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
          <AVPlayer
            assetId={assetId}
            embedUrl={embedUrl}
            iframeTitle={iframeTitle}
            title="Live radio"
            type="audio"
            skin="audio"
            placeholderSrc={audioPlaceholderImageSrc}
          />
        </Grid>
      </GelPageGrid>
      {hasRadioScheduleData && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

export default LiveRadioPage;
