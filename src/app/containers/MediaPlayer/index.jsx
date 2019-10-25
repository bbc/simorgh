import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import Caption from '../Caption';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import getPlaceholderSrc from './helpers/placeholder';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const MediaPlayerContainer = ({
  blocks,
  assetId,
  assetType,
  showPlaceholder,
}) => {
  const { platform, origin } = useContext(RequestContext);
  const { lang } = useContext(ServiceContext);
  const { enabled } = useToggle('mediaPlayer');
  const isAmp = platform === 'amp';

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');
  const captionBlock = filterForBlockType(blocks, 'caption');

  if (!aresMediaBlock) {
    return null;
  }

  const imageUrl = pathOr(
    null,
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock,
  );
  const versionId = pathOr(
    null,
    ['model', 'blocks', 0, 'model', 'versions', 0, 'versionId'],
    aresMediaBlock,
  );
  const kind = pathOr(
    null,
    ['model', 'blocks', 0, 'model', 'format'],
    aresMediaBlock,
  );

  const mediaType = kind === 'audio' ? 'audio' : 'video';

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const placeholderSrc = getPlaceholderSrc(imageUrl);
  const embedSource = embedUrl({
    requestUrl: `${assetId}/${versionId}/${lang}`,
    type: assetType,
    isAmp,
    origin,
  });

  return (
    <>
      <Metadata aresMediaBlock={aresMediaBlock} />
      {isAmp ? (
        <AmpMediaPlayer src={embedSource} placeholderSrc={placeholderSrc} />
      ) : (
        <CanonicalMediaPlayer
          src={embedSource}
          placeholderSrc={showPlaceholder && placeholderSrc}
          showPlaceholder={showPlaceholder}
        />
      )}
      {captionBlock ? <Caption block={captionBlock} type={mediaType} /> : null}
    </>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default MediaPlayerContainer;
