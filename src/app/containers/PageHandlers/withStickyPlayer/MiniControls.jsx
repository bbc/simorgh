import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, useTransition, useChain } from 'react-spring';
import { GEL_SPACING_HLF, GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getSansRegular, getSansBold } from '@bbc/psammead-styles/font-styles';
import {
  getPica,
  getDoublePica,
  getBrevier,
  getBodyCopy,
} from '@bbc/gel-foundations/typography';
import { ServiceContext } from '../../../contexts/ServiceContext';
import PlayPauseButton from './PlayPauseButton';
import ChevronIcon from './ChevronIcon';
import LivePulse from './LivePulse';

const Title = styled.h4`
  ${({ script, size }) =>
    size === 'large' ? getDoublePica(script) : getPica(script)}
  margin: 0;
  color: #f2f2f2;
  padding: 0;
  ${({ service }) => service && getSansBold(service)};
  padding-bottom: ${({ size }) => (size === 'large' ? GEL_SPACING : '0')};
`;

const Summary = styled.p`
  color: #f2f2f2;
  margin: 0;
  ${({ script }) => getBodyCopy(script)}
  ${({ service }) => service && getSansRegular(service)};
`;

const EpisodeInfoWrapper = styled.div`
  flex-grow: 1;
`;

const FlexWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const AnimatedWrapper = animated(styled.div`
  position: 'relative';
  width: 100%;
`);

const ShowMoreButton = styled.button`
  border: 0;
  background: 0;
  padding: 0;
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

const ShowMoreButtonText = styled.text`
  padding-right: ${GEL_SPACING_HLF};
`;

const PlayPauseButtonWrapper = styled.div`
  padding-right: 12px;
`;

const LiveTextWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const LiveText = styled.span`
  color: #f2f2f2;
  padding-left: 3px;
  position: relative;
  top: 1px;
  ${({ script }) => getBrevier(script)}
  ${({ service }) => service && getSansRegular(service)};
`;

export default ({ showMore, heading, summary, toggleMore }) => {
  const [height, setHeight] = useState('0px');
  const { script, service } = useContext(ServiceContext);
  const showMoreTransitionRef = useRef();
  const showLessTransitionRef = useRef();
  const showMoreNodeRef = useRef();
  const showLessNodeRef = useRef();
  const transitonStyles = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, position: 'absolute', left: 0, top: 0, width: '100%' },
  };
  const showMoreTransition = useTransition(showMore, null, {
    ...transitonStyles,
    ref: showMoreTransitionRef,
  });
  const showLessTransition = useTransition(!showMore, null, {
    ...transitonStyles,
    ref: showLessTransitionRef,
  });
  const renderTitle = size => (
    <Title key="title" script={script} service={service} size={size} darkMode>
      {heading}
    </Title>
  );
  const springAnim = useSpring({
    height,
  });

  useEffect(() => {
    setHeight(`${showLessNodeRef.current.offsetHeight}px`);
  }, []);

  useEffect(() => {
    if (showMore) {
      setHeight(`${showMoreNodeRef.current.offsetHeight}px`);
    } else {
      setHeight(`${showLessNodeRef.current.offsetHeight}px`);
    }
  }, [showMore]);

  useChain(
    showMore
      ? [showLessTransitionRef, showMoreTransitionRef]
      : [showMoreTransitionRef, showLessTransitionRef],
    [0, 0.5],
  );

  return (
    <FlexWrapper>
      <AnimatedWrapper style={springAnim}>
        {showMoreTransition.map(
          ({ item, key, props: animStyles }) =>
            item && (
              <animated.div ref={showMoreNodeRef} style={animStyles}>
                <FlexWrapper>
                  <EpisodeInfoWrapper>
                    {renderTitle('large')}
                    <Summary script={script} service={service}>
                      {summary}
                    </Summary>
                  </EpisodeInfoWrapper>
                </FlexWrapper>
              </animated.div>
            ),
        )}
        {showLessTransition.map(
          ({ item, key, props: animStyles }) =>
            item && (
              <animated.div ref={showLessNodeRef} style={animStyles}>
                <FlexWrapper>
                  <PlayPauseButtonWrapper>
                    <PlayPauseButton />
                  </PlayPauseButtonWrapper>
                  <EpisodeInfoWrapper>
                    {renderTitle()}
                    <LiveTextWrapper>
                      <LivePulse />
                      <LiveText script={script} service={service}>
                        LIVE
                      </LiveText>
                    </LiveTextWrapper>
                  </EpisodeInfoWrapper>
                </FlexWrapper>
              </animated.div>
            ),
        )}
      </AnimatedWrapper>
      <ShowMoreButton script={script} service={service} onClick={toggleMore}>
        <ShowMoreButtonText>{showMore ? 'Hide ' : 'Open'}</ShowMoreButtonText>
        <ChevronIcon isOpen={showMore} />
      </ShowMoreButton>
    </FlexWrapper>
  );
};
