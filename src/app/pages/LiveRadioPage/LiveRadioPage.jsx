import React, { useContext } from 'react';
import { string, shape } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { useLocation } from 'react-router-dom';
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
import getEmbedUrl from '#lib/utilities/getUrlHelpers/getEmbedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

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
  const { isAmp } = useContext(RequestContext);
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
  const iframeTitle =
    translations?.mediaAssetPage?.audioPlayer || 'Audio player';
  const hasRadioScheduleData = Boolean(radioScheduleData);

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
