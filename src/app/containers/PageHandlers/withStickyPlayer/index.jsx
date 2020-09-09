import React, { useContext, memo, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { MediaPlayerContext } from '../../../contexts/MediaPlayerContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import AVPlayer from '#containers/AVPlayer';
import MiniController from './MiniController';

const ToastWrapper = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  background: ${C_MIDNIGHT_BLACK};
  z-index: 5;
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

const ControlsWrapper = styled.div`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
`;

const AudioOuterWrapper = animated(styled.div`
  height: 0;
  overflow: hidden;
`);

export default Component => {
  return props => {
    const [showMore, setShowMore] = useState(false);
    const toggleMore = () => setShowMore(!showMore);
    const showMoreRef = useRef();
    const { showMediaPlayer, mediaPlayerProps } = useContext(
      MediaPlayerContext,
    );
    const { script, service } = useContext(ServiceContext);
    const toastAnimStyled = useSpring({
      transform: showMediaPlayer ? 'translateY(0%)' : 'translateY(100%)',
    });
    const showMoreAnimStyle = useSpring({
      height: showMore ? `${showMoreRef.current.offsetHeight}px` : '0px',
      opacity: showMore ? 1 : 0,
    });
    const { heading, summary } = mediaPlayerProps || {};

    return (
      <>
        <Component {...props} />

        <AnimatedToastWrapper
          showMediaPlayer={showMediaPlayer}
          style={toastAnimStyled}
        >
          <Toast>
            <ControlsWrapper>
              <MiniController />
              <Headline
                script={script}
                service={service}
                id="content"
                tabIndex="-1"
                darkMode
              >
                {heading}
              </Headline>
              <span onClick={toggleMore}>{showMore ? 'Close' : 'Open'}</span>
            </ControlsWrapper>
            <AudioOuterWrapper style={showMoreAnimStyle}>
              <div ref={showMoreRef}>
                <Paragraph script={script} service={service} darkMode>
                  {summary}
                </Paragraph>
                {mediaPlayerProps && (
                  <StyledAudioPlayer {...mediaPlayerProps} />
                )}
              </div>
            </AudioOuterWrapper>
          </Toast>
        </AnimatedToastWrapper>
      </>
    );
  };
};
