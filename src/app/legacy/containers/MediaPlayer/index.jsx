import React, { useContext } from 'react';
import { string, bool } from 'prop-types';
import Figure from '#psammead/psammead-figure/src';
import useLocation from '#hooks/useLocation';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';

import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
  MediaMessage,
} from '#components/MediaPlayer';
import getEmbedUrl, {
  makeAbsolute,
} from '#lib/utilities/getUrlHelpers/getEmbedUrl';
import { RequestContext } from '#contexts/RequestContext';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Metadata from './Metadata';
import Caption from '../Caption';
import logMissingMediaId from './helpers/logMissingMediaId';
import getPlayerProps from './helpers/propsInference';

const MediaPlayerContainer = ({
  blocks,
  assetId,
  assetType,
  showPlaceholder,
  available,
  isLegacyMedia,
  showLoadingImage,
  showCaption,
}) => {
  const { isAmp, pageType } = useContext(RequestContext);
  const { lang, translations, service } = useContext(ServiceContext);

  if (!blocks) {
    return null;
  }

  const {
    blockId,
    captionBlock,
    clipId,
    embedUrlParams,
    iframeTitle,
    mediaBlock,
    mediaInfo,
    placeholderSrc,
    placeholderSrcset,
    translatedExpiredContentMessage,
    translatedNoJSMessage,
  } = getPlayerProps({
    assetId,
    assetType,
    blocks,
    isAmp,
    isLegacyMedia,
    lang,
    pageType,
    translations,
  });

  if (!mediaBlock) {
    return null;
  }

  const landscapeRatio = '56.25%'; // (9/16)*100 = 16:9
  const StyledMessageContainer = styled.div`
    padding-top: ${landscapeRatio};
    margin-bottom: ${GEL_SPACING_DBL};
    position: relative;
    overflow: hidden;
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  const MediaPlayerWrapper = styled.div`
    margin: 0;
    padding-bottom: ${GEL_SPACING_TRPL};
    width: 100%;
  `;

  const mediaIsValid = available && (clipId || blockId);
  if (!mediaIsValid) {
    if (isLegacyMedia && available) {
      logMissingMediaId({ url: assetId, assetType });
    }
    return (
      <StyledMessageContainer>
        <MediaMessage
          service={service}
          message={translatedExpiredContentMessage}
          placeholderSrc={placeholderSrc}
          placeholderSrcset={placeholderSrcset}
        />
      </StyledMessageContainer>
    );
  }

  // Use of this conditional hook is consistent across each render.
  // Hook is positioned here to prevent multiple renders of the missing media message above.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();

  const embedSource = getEmbedUrl({
    ...embedUrlParams,
    queryString: location.search,
  });

  const caption = captionBlock ? (
    <Caption block={captionBlock} type={mediaInfo.type} service={service} />
  ) : null;

  const mediaPlayer = isAmp ? (
    <AmpMediaPlayer
      src={embedSource}
      placeholderSrc={placeholderSrc}
      placeholderSrcset={placeholderSrcset}
      title={iframeTitle}
      noJsMessage={translatedNoJSMessage}
      service={service}
    />
  ) : (
    <CanonicalMediaPlayer
      src={embedSource}
      placeholderSrc={placeholderSrc}
      placeholderSrcset={placeholderSrcset}
      showPlaceholder={showPlaceholder}
      title={iframeTitle}
      service={service}
      mediaInfo={mediaInfo}
      noJsMessage={translatedNoJSMessage}
      noJsClassName="no-js"
      showLoadingImage={showLoadingImage}
    />
  );

  return (
    <>
      <Metadata
        aresMediaBlock={mediaBlock}
        embedSource={makeAbsolute(embedSource)}
      />
      {showCaption && caption ? (
        <Figure>
          {mediaPlayer}
          {showCaption && caption}
        </Figure>
      ) : (
        <MediaPlayerWrapper>{mediaPlayer}</MediaPlayerWrapper>
      )}
    </>
  );
};

MediaPlayerContainer.propTypes = {
  ...mediaPlayerPropTypes,
  assetId: string.isRequired,
  assetType: string.isRequired,
  showPlaceholder: bool.isRequired,
  available: bool,
  isLegacyMedia: bool,
  showLoadingImage: bool,
  showCaption: bool,
};
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
  available: true,
  isLegacyMedia: false,
  showLoadingImage: false,
  showCaption: true,
};

export default MediaPlayerContainer;
