import React, { useState, useContext } from 'react';
import { string, bool, func, oneOf } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import pathOr from 'ramda/src/pathOr';

import AudioLoader from '#components/MediaPlayer/AudioLoader';

import { CanonicalMediaPlayer, AmpMediaPlayer } from '#components/MediaPlayer';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';

const Wrapper = styled.div`
  ${props => !props.hasBottomPadding && `padding-bottom: ${GEL_SPACING_DBL};`}

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ${props =>
      !props.hasBottomPadding && `padding-bottom: ${GEL_SPACING_TRPL};`}
  }
`;

const AVPlayer = ({
  assetId,
  placeholderSrc,
  title,
  embedUrl,
  iframeTitle,
  type,
  skin,
  className,
  hasBottomPadding,
  showLoadingImage,
  darkMode,
  onMediaInitialised,
}) => {
  const { translations, service } = useContext(ServiceContext);
  const { isAmp, platform } = useContext(RequestContext);

  const isValidPlatform = ['amp', 'canonical'].includes(platform);
  const mediaInfo = {
    title,
    type,
  };
  const noJsMessage = pathOr(
    `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`,
    ['media', 'noJs'],
    translations,
  );

  if (!isValidPlatform || !assetId) return null;

  return (
    <Wrapper hasBottomPadding={hasBottomPadding} className={className}>
      {isAmp ? (
        <AmpMediaPlayer
          placeholderSrc={placeholderSrc}
          src={embedUrl}
          title={iframeTitle}
          skin={skin}
          noJsMessage={noJsMessage}
          service={service}
        />
      ) : (
        <CanonicalMediaPlayer
          showPlaceholder={false}
          showLoadingImage={showLoadingImage}
          darkMode={darkMode}
          src={embedUrl}
          title={iframeTitle}
          skin={skin}
          service={service}
          mediaInfo={mediaInfo}
          noJsMessage={noJsMessage}
          noJsClassName="no-js"
          onMediaInitialised={onMediaInitialised}
        />
      )}
    </Wrapper>
  );
};

const AudioPlayer = styled(AVPlayer)`
  amp-iframe,
  div > iframe {
    width: calc(100% + ${GEL_SPACING_DBL});
    margin: 0 -${GEL_SPACING};
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      width: calc(100% + ${GEL_SPACING_QUAD});
      margin: 0 -${GEL_SPACING_DBL};
    }
  }
`;

AVPlayer.propTypes = {
  embedUrl: string,
  assetId: string,
  placeholderSrc: string,
  type: string,
  title: string,
  iframeTitle: string,
  className: string,
  skin: string,
  hasBottomPadding: bool,
  showLoadingImage: bool,
  darkMode: bool,
  onMediaInitialised: func,
};

AVPlayer.defaultProps = {
  embedUrl: '',
  assetId: '',
  placeholderSrc: '',
  type: '',
  title: '',
  iframeTitle: '',
  className: '',
  skin: 'classic',
  hasBottomPadding: true,
  showLoadingImage: false,
  darkMode: false,
  onMediaInitialised: () => {},
};

const AVSelector = props => {
  const { skin } = props;
  const [isLoading, setIsLoading] = useState(true);
  return skin === 'audio' ? (
    <AudioLoader isLoading={isLoading}>
      <AudioPlayer {...props} onMediaInitialised={() => setIsLoading(false)} />
    </AudioLoader>
  ) : (
    <AVPlayer {...props} />
  );
};

AVSelector.propTypes = {
  skin: oneOf(['classic', 'audio']),
};

AVSelector.defaultProps = {
  skin: 'classic',
};

export default AVSelector;
