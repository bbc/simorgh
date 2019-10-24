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

const MediaPlayerContainer = ({ blocks, placeholder, embedOverrides }) => {
  const { id, platform, origin } = useContext(RequestContext);
  const { lang } = useContext(ServiceContext);
  const { enabled } = useToggle('mediaPlayer');
  const isAmp = platform === 'amp';

  // Player settings can be overridden for other page types (eg, CPS)
  // TODO: Refactor in https://github.com/bbc/simorgh/issues/4418
  const type = embedOverrides.type || 'articles';
  const assetId = embedOverrides.id || id;
  const Wrapper = embedOverrides.wrapper || GridItemConstrainedMedium;
  const showPlaceholder = type === 'articles' || embedOverrides.showPlaceholder;
  // End of override logic

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

  const placeholderSrc = getPlaceholderSrc(imageUrl);
  const embedSource = embedUrl({
    requestUrl: `${assetId}/${versionId}/${lang}`,
    type,
    isAmp,
    origin,
  });

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
  embedOverrides: {},
};

export default MediaPlayerContainer;
