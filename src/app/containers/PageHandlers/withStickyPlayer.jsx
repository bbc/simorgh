import React, { useContext, memo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { C_GHOST } from '@bbc/psammead-styles/colours';

import { MediaPlayerContext } from '../../contexts/MediaPlayerContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import AVPlayer from '#containers/AVPlayer';

const ToastWrapper = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  background: ${C_GHOST};
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 24px 0px;
`;

const Toast = styled.div`
  width: 755px;
  max-width: 100%;
  margin: 0 auto;
`;

const AnimatedToastWrapper = animated(ToastWrapper);

const StyledAudioPlayer = memo(styled(AVPlayer)`
  width: 100%;
  amp-iframe {
    overflow: visible !important;
    width: calc(100% + ${GEL_SPACING_DBL});
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      width: calc(100% + ${GEL_SPACING_QUAD});
    }
  }
  iframe {
    width: calc(100% + ${GEL_SPACING_DBL});
    margin: 0 -${GEL_SPACING};
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      width: calc(100% + ${GEL_SPACING_QUAD});
      margin: 0 -${GEL_SPACING_DBL};
    }
  }
`);

export default Component => {
  return props => {
    const { showMediaPlayer, mediaPlayerProps } = useContext(
      MediaPlayerContext,
    );

    const { script, service } = useContext(ServiceContext);
    const animationStyles = useSpring({
      transform: showMediaPlayer ? 'translateY(0%)' : 'translateY(100%)',
    });
    const { heading, summary } = mediaPlayerProps || {};

    return (
      <>
        <Component {...props} />

        <AnimatedToastWrapper
          showMediaPlayer={showMediaPlayer}
          style={animationStyles}
        >
          <Toast>
            <Headline
              script={script}
              service={service}
              id="content"
              tabIndex="-1"
            >
              {heading}
            </Headline>
            <Paragraph script={script} service={service}>
              {summary}
            </Paragraph>
            {mediaPlayerProps && <StyledAudioPlayer {...mediaPlayerProps} />}
          </Toast>
        </AnimatedToastWrapper>
      </>
    );
  };
};
