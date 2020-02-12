import React, { useContext, memo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';
import { string, bool, shape } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import { pathOr } from 'ramda';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const liveRadioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const MediaPlayerOuterWrapper = styled.div`
  @media (min-width: 63rem) {
    display: flex;
    justify-content: center;
  }
`;

const MediaPlayerInnerWrapper = styled.div`
  flex-shrink: 0;
  width: 50rem;
  max-width: calc(100vw - ${GEL_SPACING_QUAD});
`;

const MemoizedMediaPlayer = memo(
  ({
    showPlaceholder,
    src,
    title,
    id,
    skin,
    service,
    mediaInfo,
    noJsMessage,
    noJsClassName,
  }) => (
    <CanonicalMediaPlayer
      showPlaceholder={showPlaceholder}
      src={src}
      title={title}
      id={id}
      skin={skin}
      service={service}
      mediaInfo={mediaInfo}
      noJsMessage={noJsMessage}
      noJsClassName={noJsClassName}
    />
  ),
  (prevProps, nextProps) => {
    /*
     * `useLocation` hook state change causes the MediaPlayer to reload
     * when the hash changes e.g. when skipping to content. This will ensure
     * the MediaPlayer only rerenders when `src` or `showPlaceholder` changes.
     */
    if (prevProps.src === nextProps.src) return true;
    if (prevProps.showPlaceholder === nextProps.showPlaceholder) return true;
    return false;
  },
);

const LiveRadioContainer = ({ idAttr, externalId, id }) => {
  const { isAmp, platform } = useContext(RequestContext);
  const { liveRadio, lang, translations, service } = useContext(ServiceContext);
  const location = useLocation();
  const isValidPlatform = ['amp', 'canonical'].includes(platform);

  if (!isValidPlatform || !externalId || !id) return null;

  const serviceId = pathOr(
    externalId,
    ['externalIdOverrides', externalId],
    liveRadio,
  );

  const embedSource = getEmbedUrl({
    mediaId: `${serviceId}/${id}/${lang}`,
    type: 'media',
    isAmp,
    queryString: location.search,
  });

  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

  const mediaInfo = {
    title: 'Live radio',
    type: 'audio',
  };

  const noJsMessage = `This ${mediaInfo.type} cannot play in your browser. Please enable Javascript or try a different browser.`;

  return (
    <MediaPlayerOuterWrapper>
      <MediaPlayerInnerWrapper>
        {isAmp ? (
          <AmpMediaPlayer
            placeholderSrc={liveRadioPlaceholderImageSrc}
            src={embedSource}
            title={iframeTitle}
            id={idAttr}
            skin="audio"
            noJsMessage={noJsMessage}
            service={service}
          />
        ) : (
          <MemoizedMediaPlayer
            showPlaceholder={false}
            src={embedSource}
            title={iframeTitle}
            id={idAttr}
            skin="audio"
            service={service}
            mediaInfo={mediaInfo}
            noJsMessage={noJsMessage}
            noJsClassName="no-js"
          />
        )}
      </MediaPlayerInnerWrapper>
    </MediaPlayerOuterWrapper>
  );
};

MemoizedMediaPlayer.propTypes = {
  showPlaceholder: bool.isRequired,
  src: string.isRequired,
  title: string.isRequired,
  id: string.isRequired,
  skin: string.isRequired,
  service: string.isRequired,
  mediaInfo: shape({
    title: string,
    type: string,
  }).isRequired,
  noJsMessage: string.isRequired,
  noJsClassName: string.isRequired,
};

LiveRadioContainer.propTypes = {
  idAttr: string,
  externalId: string.isRequired,
  id: string.isRequired,
};

LiveRadioContainer.defaultProps = {
  idAttr: null,
};

export default LiveRadioContainer;
