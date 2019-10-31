import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import Caption from '../Caption';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import getPlaceholderSrc from '#lib/utilities/srcSet/placeholder';
import { getPlaceholderSrcSet } from '#lib/utilities/srcSet';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const MediaPlayerContainer = ({ blocks }) => {
  const { id, platform, origin } = useContext(RequestContext);
  const { lang, translations } = useContext(ServiceContext);
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

  const type = kind === 'audio' ? 'audio' : 'video';

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const defaultWidth = 512;
  const placeholderSrc = getPlaceholderSrc(imageUrl, defaultWidth);
  const placeholderSrcset = getPlaceholderSrcSet(imageUrl);

  const embedSource = embedUrl({
    requestUrl: `${id}/${versionId}/${lang}`,
    type: 'articles',
    isAmp,
    origin,
  });
  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'mediaPlayer'],
    translations,
  );

  return (
    <GridItemConstrainedMedium>
      <Metadata aresMediaBlock={aresMediaBlock} />
      {isAmp ? (
        <AmpMediaPlayer
          src={embedSource}
          placeholderSrc={placeholderSrc}
          placeholderSrcset={placeholderSrcset}
          title={iframeTitle}
        />
      ) : (
        <CanonicalMediaPlayer
          src={embedSource}
          placeholderSrc={placeholderSrc}
          placeholderSrcset={placeholderSrcset}
          title={iframeTitle}
        />
      )}
      {captionBlock ? <Caption block={captionBlock} type={type} /> : null}
    </GridItemConstrainedMedium>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default MediaPlayerContainer;
