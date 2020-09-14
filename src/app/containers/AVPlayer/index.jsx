import React, { useContext } from 'react';
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

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
          src={embedUrl}
          title={iframeTitle}
          skin={skin}
          service={service}
          mediaInfo={mediaInfo}
          noJsMessage={noJsMessage}
          noJsClassName="no-js"
        />
      )}
    </Wrapper>
  );
};

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
};

export default AVPlayer;
