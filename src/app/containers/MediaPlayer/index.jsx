import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import getPlaceholderSrc from './helpers/placeholder';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const MediaPlayerContainer = ({ blocks, placeholder, embedOverrides = {} }) => {
  // Player has slightly different behavior depending on whether it is on CPS or articles page
  const type = embedOverrides.type || 'articles';
  const { id, platform, origin } = useContext(RequestContext);
  const { lang } = useContext(ServiceContext);
  const { enabled } = useToggle('mediaPlayer');
  const isAmp = platform === 'amp';

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

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

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const showPlaceholder = type === 'articles' || embedOverrides.showPlaceholder;
  const placeholderSrc = getPlaceholderSrc(imageUrl);
  const embedSource = embedUrl({
    requestUrl: `${embedOverrides.id || id}/${versionId}/${lang}`,
    type,
    isAmp,
    origin,
  });

  const Wrapper = embedOverrides.wrapper || GridItemConstrainedMedium;

  return (
    <Wrapper>
      <Metadata aresMediaBlock={aresMediaBlock} />
      {isAmp ? (
        <AmpMediaPlayer
          src={embedSource}
          showPlaceholder={showPlaceholder}
          placeholderSrc={placeholderSrc}
        />
      ) : (
        <CanonicalMediaPlayer
          src={embedSource}
          showPlaceholder={showPlaceholder}
          placeholder={placeholder}
          placeholderSrc={placeholder ? placeholderSrc : ''}
        />
      )}
    </Wrapper>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
  placeholder: true,
};

export default MediaPlayerContainer;
