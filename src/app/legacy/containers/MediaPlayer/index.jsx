import React, { useContext } from 'react';
import { string, bool } from 'prop-types';
import { useLocation } from 'react-router-dom';
import moment from 'moment-timezone';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import Figure from '#psammead/psammead-figure/src';
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
import { getPlaceholderSrcSet } from '#lib/utilities/srcSet';
import filterForBlockType from '#lib/utilities/blockHandlers';
import formatDuration from '#lib/utilities/formatDuration';
import buildIChefURL from '#lib/utilities/ichefURL';
import { RequestContext } from '#contexts/RequestContext';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Metadata from './Metadata';
import Caption from '../Caption';
import logMissingMediaId from './helpers/logMissingMediaId';

const DEFAULT_WIDTH = 512;
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
  const { isAmp } = useContext(RequestContext);
  const { lang, translations, service } = useContext(ServiceContext);
  const location = useLocation();
  if (!blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');
  const articleCaptionBlock = filterForBlockType(blocks, 'caption');
  const cpsCaptionBlock = filterForBlockType(
    path(['model', 'blocks'], aresMediaBlock),
    'caption',
  );
  const captionBlock = articleCaptionBlock || cpsCaptionBlock;

  if (!aresMediaBlock) {
    return null;
  }

  const { originCode, locator } = pathOr(
    {},
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model'],
    aresMediaBlock,
  );
  const versionId = path(
    ['model', 'blocks', 0, 'model', 'versions', 0, 'versionId'],
    aresMediaBlock,
  );
  const blockId = path(
    ['model', 'blocks', 0, 'model', 'blockId'],
    aresMediaBlock,
  );

  const format = path(
    ['model', 'blocks', 0, 'model', 'format'],
    aresMediaBlock,
  );
  const rawDuration = path(
    ['model', 'blocks', 0, 'model', 'versions', 0, 'duration'],
    aresMediaBlock,
  );
  const duration = moment.duration(rawDuration, 'seconds');
  const durationSpokenPrefix = pathOr(
    'Duration',
    ['media', 'duration'],
    translations,
  );
  const separator = ',';

  const mediaInfo = {
    title: path(['model', 'blocks', 0, 'model', 'title'], aresMediaBlock),
    duration: formatDuration({ duration, padMinutes: true }),
    durationSpoken: `${durationSpokenPrefix} ${formatDuration({
      duration,
      separator,
    })}`,
    datetime: path(
      ['model', 'blocks', 0, 'model', 'versions', 0, 'durationISO8601'],
      aresMediaBlock,
    ),
    type: format === 'audio' ? 'audio' : 'video',
    guidanceMessage: path(
      ['model', 'blocks', 0, 'model', 'versions', 0, 'warnings', 'short'],
      aresMediaBlock,
    ),
  };

  const placeholderSrcset = getPlaceholderSrcSet({ originCode, locator });
  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

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

  const noJsMessage = `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`;
  const contentNotAvailableMessage = `This content is no longer available`;

  const translatedNoJSMessage =
    path(['media', 'noJs'], translations) || noJsMessage;

  const translatedExpiredContentMessage =
    path(['media', 'contentExpired'], translations) ||
    contentNotAvailableMessage;

  const mediaIsValid = available && (versionId || blockId);
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

  const embedSource = getEmbedUrl({
    mediaId: `${assetId}/${isLegacyMedia ? blockId : versionId}/${lang}`,
    type: assetType,
    isAmp,
    queryString: location.search,
  });

  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'mediaPlayer'],
    translations,
  );

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
        aresMediaBlock={aresMediaBlock}
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
