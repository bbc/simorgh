import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { MediaPlayerContext } from '../../../contexts/MediaPlayerContext';
import AVPlayer from '#containers/AVPlayer';
import MiniControls from './MiniControls';
import ExitPlayerButton from './ExitPlayerButton';

export const Title = styled.h4`
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  margin: 0;
  color: #f2f2f2;
  padding: ${GEL_SPACING};
  padding: 4px 0 0;
  ${({ service }) => service && getSansRegular(service)};
`;

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
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING_DBL};
`;

const AnimatedToastWrapper = animated(ToastWrapper);

const StyledAudioPlayer = styled(AVPlayer)`
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
`;

const AudioOuterWrapper = animated(styled.div`
  height: 0;
  overflow: hidden;
  width: calc(100% + 2rem);
  margin-left: -${GEL_SPACING_DBL};
  padding: 0 ${GEL_SPACING_DBL};
`);

export default Component => {
  return props => {
    const [showMore, setShowMore] = useState(false);
    const toggleMore = () => setShowMore(!showMore);
    const showMoreRef = useRef();
    const { mediaPlayerProps, showMediaPlayer } = useContext(
      MediaPlayerContext,
    );
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
            <MiniControls
              showMore={showMore}
              heading={heading}
              summary={summary}
              toggleMore={toggleMore}
            />
            <AudioOuterWrapper style={showMoreAnimStyle}>
              <div ref={showMoreRef}>
                {mediaPlayerProps && (
                  <StyledAudioPlayer
                    {...mediaPlayerProps}
                    /* Ensure we are using the test embed url, even if simorgh environment is live (eg on blue/green stack) */
                    embedUrl={mediaPlayerProps.embedUrl
                      .replace('www.bbc.com', 'www.test.bbc.com')
                      .replace('//bbc.com', '//test.bbc.com')}
                  />
                )}
                <ExitPlayerButton />
              </div>
            </AudioOuterWrapper>
          </Toast>
        </AnimatedToastWrapper>
      </>
    );
  };
};
