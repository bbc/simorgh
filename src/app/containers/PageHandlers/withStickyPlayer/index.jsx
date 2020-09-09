import React, { useContext, memo, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { C_EBON } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import Paragraph from '@bbc/psammead-paragraph';
import { MediaPlayerContext } from '../../../contexts/MediaPlayerContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import AVPlayer from '#containers/AVPlayer';
import MiniController from './MiniController';
import ChevronIcon from './ChevronIcon';

export const Title = styled.h4`
  margin: 0; /* Reset */
  padding: ${GEL_SPACING};
  padding: 4px 0 0;
  ${({ service }) => service && getSansRegular(service)};
`;

const TitleWrapper = styled.div`
  flex-grow: 1;
  padding-left: 12px;
`;

const ToastWrapper = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  background: ${C_EBON};
  z-index: 5;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 24px 0px;
`;

const Toast = styled.div`
  width: 755px;
  max-width: 100%;
  margin: 0 auto;
  padding: 12px;
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
`;

const AudioOuterWrapper = animated(styled.div`
  height: 0;
  overflow: hidden;
`);

const ShowMoreButton = styled.button`
  border: 0;
  background: 0;
  color: #fff;
  display: flex;
  align-items: center;
  outline: 0;
  cursor: pointer;
  font-size: 0.85rem;
  ${({ service }) => service && getSansRegular(service)};
  .icon {
    transition: 0.2s ease-in-out all;
  }
  .icon.is-open {
    transform: rotate(180deg);
  }
`;

export default Component => {
  return props => {
    const [showMore, setShowMore] = useState(false);
    const toggleMore = () => setShowMore(!showMore);
    const showMoreRef = useRef();
    const { mediaPlayerProps, showMediaPlayer } = useContext(
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
              <TitleWrapper>
                <Title script={script} service={service} darkMode>
                  {heading}
                </Title>
              </TitleWrapper>
              <ShowMoreButton
                script={script}
                service={service}
                onClick={toggleMore}
              >
                {showMore ? 'Hide' : 'Open'}
                <ChevronIcon isOpen={showMore} />
              </ShowMoreButton>
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
