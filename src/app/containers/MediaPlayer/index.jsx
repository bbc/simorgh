import React, { useContext } from 'react';
import { string, bool } from 'prop-types';
import { useLocation } from 'react-router-dom';
import moment from 'moment-timezone';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import Figure from '@bbc/psammead-figure';
import styled from 'styled-components';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
  MediaMessage,
} from '@bbc/psammead-media-player';
import Caption from '../Caption';
import Metadata from './Metadata';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';
import { getPlaceholderSrcSet } from '#lib/utilities/srcSet';
import filterForBlockType from '#lib/utilities/blockHandlers';
import formatDuration from '#lib/utilities/formatDuration';
import buildIChefURL from '#lib/utilities/ichefURL';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import toggles from '#lib/config/toggles';
import onClient from '#lib/utilities/onClient';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import logEmbedSourceStatus from './helpers/logEmbedSourceStatus';

const { logMediaPlayerStatus } = toggles[
  process.env.SIMORGH_APP_ENV || 'local'
];
const DEFAULT_WIDTH = 512;
const MediaPlayerContainer = ({
  blocks,
  assetId,
  assetType,
  showPlaceholder,
  available,
  isLegacyMedia,
}) => {
  const { isAmp } = useContext(RequestContext);
  const { lang, translations, service } = useContext(ServiceContext);
  const { enabled } = useToggle('mediaPlayer');
  const location = useLocation();
  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');
  const captionBlock = filterForBlockType(blocks, 'caption');

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

  if (!(versionId || blockId)) {
    return null; // this should be the holding image with an error overlay
  }

  const placeholderSrcset = getPlaceholderSrcSet({ originCode, locator });
  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

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

  const landscapeRatio = '56.25%'; // (9/16)*100 = 16:9
  const StyledMessageContainer = styled.div`
    padding-top: ${landscapeRatio};
    position: relative;
    overflow: hidden;
  `;

  const noJsMessage = `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`;
  const contentNotAvailableMessage = `This content is no longer available`;

  const translatedNoJSMessage =
    path(['media', 'noJs'], translations) || noJsMessage;

  const translatedExpiredContentMessage =
    path(['media', 'contentExpired'], translations) ||
    contentNotAvailableMessage;

  if (!available) {
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

  if (!onClient() && logMediaPlayerStatus.enabled) {
    logEmbedSourceStatus({
      url: assetId,
      embedUrl: embedSource,
      assetType,
    });
  }

  return (
    <>
      <Metadata aresMediaBlock={aresMediaBlock} embedSource={embedSource} />
      <Figure>
        {isAmp ? (
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
          />
        )}
        {captionBlock && <Caption block={captionBlock} type={mediaInfo.type} />}
      </Figure>
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
};
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
  available: true,
  isLegacyMedia: false,
};

export default MediaPlayerContainer;
