import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';
import { string, bool } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
  MediaMessage,
} from '@bbc/psammead-media-player';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const audioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const getMediaInfo = assetId => ({
  title: assetId === 'liveradio' ? 'Live radio' : 'On-demand radio',
  type: 'audio',
});

const getMasterBrand = (masterBrand, liveRadioIdOverrides) =>
  pathOr(masterBrand, ['masterBrand', masterBrand], liveRadioIdOverrides);

const OuterWrapper = styled.div`
  @media (min-width: 63rem) {
    display: flex;
    justify-content: center;
  }
`;

const InnerWrapper = styled.div`
  flex-shrink: 0;
  width: 50rem;
  max-width: calc(100vw - ${GEL_SPACING_QUAD});
  position: relative;
  overflow: hidden;
  height: 165px;
`;

const AudioPlayer = ({
  externalId: _masterBrand,
  id: assetId,
  idAttr,
  isExpired,
}) => {
  const { liveRadioOverrides, lang, translations, service } = useContext(
    ServiceContext,
  );
  const masterBrand = getMasterBrand(_masterBrand, liveRadioOverrides);
  const { isAmp, platform } = useContext(RequestContext);
  const location = useLocation();
  const isValidPlatform = ['amp', 'canonical'].includes(platform);
  const mediaInfo = getMediaInfo(assetId);
  const noJsMessage = `This ${mediaInfo.type} cannot play in your browser. Please enable Javascript or try a different browser.`;

  if (!isValidPlatform || !masterBrand || !assetId) return null;

  if (isExpired) {
    const expiredContentMessage = pathOr(
      'This content is no longer available',
      ['media', 'contentExpired'],
      translations,
    );

    return (
      <OuterWrapper>
        <InnerWrapper>
          <MediaMessage service={service} message={expiredContentMessage} />
        </InnerWrapper>
      </OuterWrapper>
    );
  }

  const embedUrl = getEmbedUrl({
    mediaId: `${masterBrand}/${assetId}/${lang}`,
    type: 'media',
    isAmp,
    queryString: location.search,
  });

  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

  return (
    <OuterWrapper>
      <InnerWrapper>
        {isAmp ? (
          <AmpMediaPlayer
            placeholderSrc={audioPlaceholderImageSrc}
            src={embedUrl}
            title={iframeTitle}
            id={idAttr}
            skin="audio"
            noJsMessage={noJsMessage}
            service={service}
          />
        ) : (
          <CanonicalMediaPlayer
            showPlaceholder={false}
            src={embedUrl}
            title={iframeTitle}
            id={idAttr}
            skin="audio"
            service={service}
            mediaInfo={mediaInfo}
            noJsMessage={noJsMessage}
            noJsClassName="no-js"
          />
        )}
      </InnerWrapper>
    </OuterWrapper>
  );
};

AudioPlayer.propTypes = {
  externalId: string.isRequired,
  id: string.isRequired,
  idAttr: string,
  isExpired: bool,
};

AudioPlayer.defaultProps = {
  idAttr: null,
  isExpired: false,
};

export default AudioPlayer;
