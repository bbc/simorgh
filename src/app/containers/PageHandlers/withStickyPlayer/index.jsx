import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { MediaPlayerContext } from '../../../contexts/MediaPlayerContext';
import AVPlayer from '#containers/AVPlayer';
import MiniControls from './MiniControls';
import ExitPlayerButton from './ExitPlayerButton';
import Container from './Container';

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
  padding: 0;
`;

const MiniControlsWrapper = styled.div`
  padding: ${GEL_SPACING_DBL} 0;
`;

const AnimatedToastWrapper = animated(ToastWrapper);

const AudioOuterWrapper = animated(styled.div`
  height: 0;
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
            <Container>
              <MiniControlsWrapper>
                <MiniControls
                  showMore={showMore}
                  heading={heading}
                  summary={summary}
                  toggleMore={toggleMore}
                />
              </MiniControlsWrapper>
            </Container>

            <AudioOuterWrapper style={showMoreAnimStyle}>
              <div ref={showMoreRef}>
                <Container>
                  {mediaPlayerProps && (
                    <AVPlayer
                      {...mediaPlayerProps}
                      /* Ensure we are using the test embed url, even if simorgh environment is live (eg on blue/green stack) */
                      embedUrl={mediaPlayerProps.embedUrl
                        .replace('www.bbc.com', 'www.test.bbc.com')
                        .replace('//bbc.com', '//test.bbc.com')}
                    />
                  )}
                </Container>
                <ExitPlayerButton />
              </div>
            </AudioOuterWrapper>
          </Toast>
        </AnimatedToastWrapper>
      </>
    );
  };
};
